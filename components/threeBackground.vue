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
// const { useScene, useCamera, useRenderer } = useNuxtApp()  // plugins

const { width, height } = useWindowSize()  // vueuse
const { pixelRatio } = useDevicePixelRatio() // vueuse

const threeElem = ref(null)
const renderer = ref(null)
const orbitControl = ref(null)

const time = ref(0)
const uProgress = ref(0)

const aspect = computed(() => width.value / height.value)


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


// const geometry = new $three.BoxGeometry( 1, 1, 1, 20, 20, 20 );
// const material = new $three.MeshBasicMaterial({
//     color: 0xff0000,
//     side: $three.DoubleSide,
// });

// const mesh = new $three.Mesh(geometry, material);
// scene.add(mesh);

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
    loadModel()
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
        fov: (180 * (2 * Math.atan(height.value / 2 / 0.5))) / Math.PI,
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