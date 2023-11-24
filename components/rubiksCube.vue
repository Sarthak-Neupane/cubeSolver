<template>
    <div class="fixed top-0 left-0 -z-10 h-screen w-full" ref="threeElem">
    </div>
</template>

<script setup>
import { useWindowSize, useDevicePixelRatio, useRafFn } from '@vueuse/core'
import { updateRenderer } from '~/helpers/updateRenderer';
import { updateCamera } from '~/helpers/updateCamera';
import { colorCube } from '~/helpers/colorCube';
// import fragmentShader from '~/shaders/fragment.glsl'
// import vertexShader from '~/shaders/vertex.glsl'
import gsap from 'gsap';

defineExpose({
    rotate: (key) => {
        rotate(key)
    },
    scramble: () => {
        scramble()
    }
})

const { $three } = useNuxtApp()  // plugins
const { $orbitControls } = useNuxtApp()  // plugins

const { width, height } = useWindowSize()  // vueuse
const { pixelRatio } = useDevicePixelRatio() // vueuse

const threeElem = ref(null)
const renderer = ref(null)
const orbitControl = ref(null)


const time = ref(0)
// const uProgress = ref(0)

const aspect = computed(() => width.value / height.value)

const gRubiks = new $three.Group()

const animation_running = ref(false)
let t1 = gsap.timeline(
    {
        duration: 0.5,
        onStart: () => {
            animation_running.value = true
        },
        onComplete: () => {
            clearGroups()
            updatePosition()
            animation_running.value = false
        }
    }
)

let Front_Group = null
let Right_Group = null
let Back_Group = null
let Left_Group = null
let Up_Group = null
let Down_Group = null
let Middle_Vertical_Group = null
let Middle_Horizontal_Group = null
let groupF = []
let groupB = [];
let groupR = [];
let groupL = [];
let groupU = [];
let groupD = [];
let groupMV = [];
let groupMH = [];

const scene = useScene()
const camera = useCamera({
    cameraType: 'Perspective',
    position: { x: 5, y: 5, z: 5 },
    fov: 75,
    // fov: (180 * (2 * Math.atan(height.value / 2 / 0.5))) / Math.PI,
    aspect: aspect.value,
    near: 0.1,
    far: 1000,
})

scene.add(camera)


const geometry = new $three.BoxGeometry(1, 1, 1, 20, 20, 20);
geometry.needsUpdate = true
const material = new $three.MeshBasicMaterial({
    side: $three.DoubleSide,
});


const buildTheCube = () => {
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
                const geometryCloned = geometry.clone()
                const materialCloned = material.clone()
                const mesh = new $three.Mesh(geometryCloned, materialCloned)
                gRubiks.add(mesh)
                mesh.position.set(i, j, k)
                // let position = new $three.Vector3(i, j, k)
                mesh.userData = {
                    position: new $three.Vector3(i, j, k)
                }
                const sumOfPositions = i + j + k
                if (i === 0 && j === 0 && k === 0) continue
                if(sumOfPositions == 1 || sumOfPositions == -1) {
                    mesh.userData = {
                        ...mesh.userData,
                        type: 'center'
                    }
                    const findExactCube = colorCube('center', { i, j, k })
                    if (findExactCube) {
                        mesh.material = new $three.MeshBasicMaterial({ map: findExactCube.map })
                    }
                }
                if (i !== 0 && j !== 0 && k !== 0) {
                    mesh.userData = {
                        ...mesh.userData,
                        type: 'corner'
                    }
                    const findExactCube = colorCube('corner', { i, j, k })
                    if (findExactCube) {
                        mesh.material = [
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[0] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[1] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[2] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[3] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[4] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[5] }),
                        ]
                    }
                }
                if (sumOfPositions === 2 || sumOfPositions === -2 || sumOfPositions === 0) {
                    mesh.userData = {
                        ...mesh.userData,
                        type: 'face'
                    }
                    const findExactCube = colorCube('face', { i, j, k })
                    if (findExactCube) {
                        mesh.material = [
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[5] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[4] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[3] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[2] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[1] }),
                            new $three.MeshBasicMaterial({ map: findExactCube.textures[0] }),
                        ]
                    }
                }
            }
        }
    }
    scene.add(gRubiks)
}


const clearGroups = () => {
    groupF = []
    groupB = [];
    groupR = [];
    groupL = [];
    groupU = [];
    groupD = [];
    groupMV = [];
    groupMH = [];
    Front_Group = new $three.Group()
    Right_Group = new $three.Group()
    Back_Group = new $three.Group()
    Left_Group = new $three.Group()
    Up_Group = new $three.Group()
    Down_Group = new $three.Group()
    Middle_Vertical_Group = new $three.Group()
    Middle_Horizontal_Group = new $three.Group()
}

const updatePosition = () => {
    scene.traverse((child) => {
        if (!child.isMesh) return
        let vecnew = new $three.Vector3()
        child.localToWorld(vecnew)
        vecnew.round()
        child.userData.position = vecnew
        setGroups(child)
    })
}


const setGroups = (c) => {
    if (c.userData.position.z === 1) {
        groupF.push(c)
    }
    if (c.userData.position.x === 1) {
        groupR.push(c)
    }
    if (c.userData.position.z === -1) {
        groupB.push(c)
    }
    if (c.userData.position.x === -1) {
        groupL.push(c)
    }
    if (c.userData.position.y === 1) {
        groupU.push(c)
    }
    if (c.userData.position.y === -1) {
        groupD.push(c)
    }
    if (c.userData.position.x === 0) {
        groupMV.push(c)
    }
    if (c.userData.position.y === 0) {
        groupMH.push(c)
    }
}

const rotate = (key) => {
    if (animation_running.value) return
    switch (key) {
        case 'F':
            groupF.forEach((child) => {
                Front_Group.attach(child)
            })
            scene.add(Front_Group)
            t1.to(Front_Group.rotation, {
                z: -Math.PI / 2,
            })
            break;
        case 'R':
            groupR.forEach((child) => {
                Right_Group.attach(child)
            })
            scene.add(Right_Group)
            t1.to(Right_Group.rotation, {
                x: -Math.PI / 2,
            })
            break;
        case 'B':
            groupB.forEach((child) => {
                Back_Group.attach(child)
            })
            scene.add(Back_Group)
            t1.to(Back_Group.rotation, {
                z: -Math.PI / 2,
            })
            break;
        case 'L':
            groupL.forEach((child) => {
                Left_Group.attach(child)
            })
            scene.add(Left_Group)
            t1.to(Left_Group.rotation, {
                x: -Math.PI / 2,
            })
            break;
        case 'U':
            groupU.forEach((child) => {
                Up_Group.attach(child)
            })
            scene.add(Up_Group)
            t1.to(Up_Group.rotation, {
                y: -Math.PI / 2,
            })
            break;
        case 'D':
            groupD.forEach((child) => {
                Down_Group.attach(child)
            })
            scene.add(Down_Group)
            t1.to(Down_Group.rotation, {
                y: -Math.PI / 2,
            })
            break;
        case 'MV':
            groupMV.forEach((child) => {
                Middle_Vertical_Group.attach(child)
            })
            scene.add(Middle_Vertical_Group)
            t1.to(Middle_Vertical_Group.rotation, {
                x: -Math.PI / 2,
            })
            break;
        case 'MH':
            groupMH.forEach((child) => {
                Middle_Horizontal_Group.attach(child)
            })
            scene.add(Middle_Horizontal_Group)
            t1.to(Middle_Horizontal_Group.rotation, {
                y: -Math.PI / 2,
            })
            break;
        default:
            break;
    }
}

const scramble = () => {
    if (animation_running.value) return
    const random_array = ['F', 'B', 'R', 'L', 'U', 'D', 'MV', 'MH']
    let moves = 0
    const interval = setInterval(() => {
        const random_number = Math.floor(Math.random() * 8)
        rotate(random_array[random_number])
        moves++
        if (moves === 10) clearInterval(interval)
    }, 600)
}

const addLights = () => {
    const ambient = new $three.AmbientLight({
        color: 0xffffff,
        intensity: 10,
    });
    const directional = new $three.DirectionalLight({
        color: 0xffffff,
        intensity: 10,
    });
    scene.add(ambient, directional);
}

const createRenderer = () => {
    if (threeElem.value) {
        renderer.value = useRenderer({
            core: {
                antialias: true,
                alpha: true,
            },
            parent: threeElem.value,
        })
        setRenderer()
    }
    orbitControl.value = new $orbitControls(camera, renderer.value.domElement)
    addLights()
    buildTheCube()
}

const setRenderer = () => {
    updateRenderer(renderer.value, {
        size: {
            width: width.value,
            height: height.value,
        },
        pixelRatio: pixelRatio.value,
        scene: scene,
        camera: camera,
    })
}


onMounted(() => {
    createRenderer()
})

watch(aspect, () => {
    updateCamera(camera, {
        aspect: aspect.value,
        fov: 75,
        // fov: (180 * (2 * Math.atan(height.value / 2 / 0.5))) / Math.PI,
    })
    // orbitControl.value.update()
    setRenderer()
})

useRafFn(() => {
    time.value += 0.01
    renderer.value.render(scene, camera)
    orbitControl.value.update()
})
</script>