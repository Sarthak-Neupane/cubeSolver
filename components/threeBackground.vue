<template>
    <div class="fixed top-0 left-0 -z-10 h-screen w-full" ref="threeElem">
    </div>
</template>

<script setup>
import { useWindowSize, useDevicePixelRatio, useRafFn } from '@vueuse/core'
import { updateRenderer } from '~/helpers/updateRenderer';
import { updateCamera } from '~/helpers/updateCamera';
import fragmentShader from '~/shaders/fragment.glsl'
import vertexShader from '~/shaders/vertex.glsl'

const { $three } = useNuxtApp()  // plugins
const { $orbitControls } = useNuxtApp()  // plugins
const { $gltfLoader } = useNuxtApp()  // plugins

const { width, height } = useWindowSize()  // vueuse
const { pixelRatio } = useDevicePixelRatio() // vueuse

const threeElem = ref(null)
const renderer = ref(null)
const orbitControl = ref(null)


const time = ref(0)
const uProgress = ref(0)

const aspect = computed(() => width.value / height.value)

const gRubiks = new $three.Group()
const red = new $three.Color(0xff0000)
const blue = new $three.Color(0x0000ff)
const green = new $three.Color(0x00ff00)
const yellow = new $three.Color(0xffff00)
const orange = new $three.Color(0xffa500)
const white = new $three.Color(0xffffff)
const BLACK_COLOR = new $three.Color(0x000000)

const red_texture = new $three.TextureLoader().load('assets/Cube/Group 2.png')
const blue_texture = new $three.TextureLoader().load('assets/Cube/Group 3.png')
const green_texture = new $three.TextureLoader().load('assets/Cube/Group 4.png')
const yellow_texture = new $three.TextureLoader().load('assets/Cube/Group 5.png')
const orange_texture = new $three.TextureLoader().load('assets/Cube/Group 6.png')
const white_texture = new $three.TextureLoader().load('assets/Cube/Group 1.png')
const black_texture = new $three.TextureLoader().load('assets/Cube/Group 7.png')



const cubeThreeFaces = [
    {x: -1, y: -1, z: -1, textures: [black_texture, orange_texture, black_texture, yellow_texture, black_texture, white_texture]},
    { x: 1, y: -1, z: -1, textures: [green_texture, black_texture, black_texture, yellow_texture, black_texture, white_texture] },
    { x: -1, y: 1, z: -1, textures: [black_texture, orange_texture, red_texture, black_texture, black_texture, white_texture] },
    { x: 1, y: 1, z: -1, textures: [ green_texture, black_texture, red_texture, black_texture, black_texture, white_texture ] },
    { x: -1, y: -1, z: 1, textures: [ black_texture, orange_texture, black_texture, yellow_texture, blue_texture, black_texture ] },
    { x: 1, y: -1, z: 1, textures: [ green_texture, black_texture, black_texture, yellow_texture, blue_texture, black_texture ] },
    { x: -1, y: 1, z: 1, textures: [ black_texture, orange_texture, red_texture, black_texture, blue_texture, black_texture ] },
    { x: 1, y: 1, z: 1, textures: [green_texture, black_texture, red_texture, black_texture, blue_texture, black_texture] }
]

const cubeTwoFaces = [
    { x: 0, y: 1, z: 1, textures: [black_texture, blue_texture, black_texture, red_texture, black_texture, black_texture] },
    { x: 0, y: -1, z: 1, textures: [black_texture, blue_texture, yellow_texture, black_texture, black_texture, black_texture] },
    { x: 1, y: 0, z: 1, textures: [black_texture, blue_texture, black_texture, black_texture, black_texture, green_texture] },
    { x: -1, y: 0, z: 1, textures: [black_texture, blue_texture, black_texture, black_texture, orange_texture, black_texture] },
    { x: 0, y: 1, z: -1, textures: [white_texture, black_texture, black_texture, red_texture, black_texture, black_texture] },
    { x: 0, y: -1, z: -1, textures: [white_texture, black_texture, yellow_texture, black_texture, black_texture, black_texture] },
    { x: 1, y: 0, z: -1, textures: [white_texture, black_texture, black_texture, black_texture, black_texture, green_texture] },
    { x: -1, y: 0, z: -1, textures: [white_texture, black_texture, black_texture, black_texture, orange_texture, black_texture] },
    { x: 1, y: 1, z: 0, textures: [black_texture, black_texture, black_texture, red_texture, black_texture, green_texture] },
    { x: 1, y: -1, z: 0, textures: [black_texture, black_texture, yellow_texture, black_texture, black_texture, green_texture] },
    { x: -1, y: 1, z: 0, textures: [black_texture, black_texture, black_texture, red_texture, orange_texture, black_texture] },
    { x: -1, y: -1, z: 0, textures: [black_texture, black_texture, yellow_texture, black_texture, orange_texture, black_texture] },
]
// ======, blue, ======, red, ======, ======
// ======, blue, yellow, ======, ======, ======
// ======, blue, ======, ======, ======, green
// ======, blue, ======, ======, orange, ======
// white, ======, ======, red, ======, ======
// white, ======, yellow, ======, ======, ======
// white, ======, ======, ======, ======, green
// white, ======, ======, ======, orange, ======
// ======, ======, ======, red, ======, green
// ======, ======, yellow, ======, ======, green
// ======, ======, ======, red, orange, ======
// ======, ======, yellow, ======, orange, ======

const colors = [
    white,
    red,
    blue,
    green,
    yellow,
    orange,
]

const cubeSingleFaces = [
    { x: 0, y: 0, z: 1, map: blue_texture },
    { x: 0, y: 0, z: -1, map: white_texture },
    { x: 0, y: 1, z: 0, map: red_texture },
    { x: 0, y: -1, z: 0, map: yellow_texture },
    { x: 1, y: 0, z: 0, map: green_texture },
    { x: -1, y: 0, z: 0, map: orange_texture },
]


const cubeNoFaces = [
    { x: 0, y: 0, z: 0, map: black_texture },
]

const scene = useScene()
const camera = useCamera({
    cameraType: 'Perspective',
    position: { x: 0, y: 0, z: 10 },
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
    map: black_texture,
    side: $three.DoubleSide,
});


const buildTheCube = () => {
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
                const geometryCloned = geometry.clone()
                const materialCloned = material.clone()
                const mesh = new $three.Mesh(geometryCloned, materialCloned)
                mesh.position.set(i, j, k)
                gRubiks.add(mesh)
                scene.add(mesh)
                const sumOfPositions = i + j + k
                if (i === 0 && j === 0 && k === 0) continue
                if (i !== 0 && j !== 0 && k !== 0) {
                    const findExactCube = cubeThreeFaces.find((e) => e.x === i && e.y === j && e.z === k)
                    if(findExactCube){
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
                    const findExactCube = cubeTwoFaces.find((e) => e.x === i && e.y === j && e.z === k)
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
    console.log(scene)
}

const colorCenter = () => {
    cubeSingleFaces.forEach((e, i) => {
        scene.children.forEach((child) => {
            if (!child.isMesh) return
            if (child.position.x === e.x && child.position.y === e.y && child.position.z === e.z) {
                child.material = new $three.MeshBasicMaterial({ map: e.map })
            }
        })
    })
    console.log(scene)
}

const loadTextures = () => {
    const loader = new $three.TextureLoader()
    
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
    addLights()
    buildTheCube()
    colorCenter()
    // loadModel()
}

const loadModel = () => {
    const loader = new $gltfLoader()
    loader.load('assets/scene.gltf', (gltf) => {
        scene.add(gltf.scene)
        gltf.scene.position.set(0, 0, 0)
        gltf.scene.scale.set(35, 35, 35)
        console.log(gltf)
    }, () => { }, (error) => {
        console.log(error)
    })
}

watch(aspect, () => {
    updateCamera(camera, {
        aspect: aspect.value,
        // fov: (180 * (2 * Math.atan(height.value / 2 / 0.5))) / Math.PI,
        fov: 75
    })
    orbitControl.value.update()
    setRenderer()
})

onMounted(() => {
    createRenderer()
})


useRafFn(() => {
    time.value += 0.01
    renderer.value.render(scene, camera)
})
</script>