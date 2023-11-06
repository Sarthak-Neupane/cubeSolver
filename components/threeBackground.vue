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
    position: { x: 0, y: 0, z: 0.5 },
    fov: (180 * (2 * Math.atan(height.value / 2 / 0.5))) / Math.PI,
    aspect: aspect.value,
    near: 0.1,
    far: 1000,
})

scene.add(camera)

const geometry = new $three.BoxGeometry(75, 75, 75);
const material = new $three.ShaderMaterial({
    side: $three.DoubleSide,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        time: time.value,
        resolution: { value: new $three.Vector2(width.value, height.value) },
        uProgress: uProgress.value
    },
});
// const material = new $three.MeshNormalMaterial();
const mesh = new $three.Mesh(geometry, material);
scene.add(mesh);

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