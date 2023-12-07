<script setup>
import { useWindowSize, useDevicePixelRatio, useRafFn } from '@vueuse/core'

const three = ref(null)

const F_clicked = ref(1)
const B_clicked = ref(1)
const R_clicked = ref(1)
const L_clicked = ref(1)
const U_clicked = ref(1)
const D_clicked = ref(1)
const MV_clicked = ref(1)
const MH_clicked = ref(1)

const clickedF = () => {
    F_clicked.value++
    three.value.rotate('F')
}
const clickedB = () => {
    B_clicked.value++
    three.value.rotate('B')
}
const clickedR = () => {
    R_clicked.value++
    three.value.rotate('R')
}
const clickedL = () => {
    L_clicked.value++
    three.value.rotate('L')
}
const clickedU = () => {
    U_clicked.value++
    three.value.rotate('U')
}
const clickedD = () => {
    D_clicked.value++
    three.value.rotate('D')
}
const clickedMv = () => {
    MV_clicked.value++
    three.value.rotate('MV')
}
const clickedMh = () => {
    MH_clicked.value++
    three.value.rotate('MH')
}

const clickedF_ = () => {
    F_clicked.value--
    three.value.rotate('F_')
}

const clickedB_ = () => {
    B_clicked.value--
    three.value.rotate('B_')
}

const clickedR_ = () => {
    R_clicked.value--
    three.value.rotate('R_')
}

const clickedL_ = () => {
    L_clicked.value--
    three.value.rotate('L_')
}

const clickedU_ = () => {
    U_clicked.value--
    three.value.rotate('U_')
}

const clickedD_ = () => {
    D_clicked.value--
    three.value.rotate('D_')
}

const clickedMv_ = () => {
    MV_clicked.value--
    three.value.rotate('MV_')
}

const clickedMh_ = () => {
    MH_clicked.value--
    three.value.rotate('MH_')
}



const scramble = () => {
    three.value.scramble()
}

const reset_camera = () => {
    three.value.resetCamera()
}

</script>

<template>
    <section class="font-['Rubik'] bg-black text-white h-[100vh]">
        <div class="py-4">
            <h1 class="text-center py-5 text-2xl lg:text-4xl 2xl:text-7xl font-bold"> Rubik's Cube Simulator </h1>
        </div>
        <div class="w-full flex flex-col justify-between items-center gap-5">
            <div class="flex justify-center items-center gap-5 flex-col">
                <div class="flex justify-center items-center gap-2 flex-wrap">
                    <cube-button @click="clickedF">F</cube-button>
                    <cube-button @click="clickedB">B</cube-button>
                    <cube-button @click="clickedR">R</cube-button>
                    <cube-button @click="clickedL">L</cube-button>
                    <cube-button @click="clickedU">U</cube-button>
                    <cube-button @click="clickedD">D</cube-button>
                    <cube-button @click="clickedMv"> MV </cube-button>
                    <cube-button @click="clickedMh"> MH </cube-button>
                </div>
                <div class="flex justify-center items-center gap-2 flex-wrap">
                    <cube-button @click="clickedF_">F'</cube-button>
                    <cube-button @click="clickedB_">B'</cube-button>
                    <cube-button @click="clickedR_">R'</cube-button>
                    <cube-button @click="clickedL_">L'</cube-button>
                    <cube-button @click="clickedU_">U'</cube-button>
                    <cube-button @click="clickedD_">D'</cube-button>
                    <cube-button @click="clickedMv_"> MV' </cube-button>
                    <cube-button @click="clickedMh_"> MH' </cube-button>
                </div>
            </div>
            <section class="relative">
                <client-only>
                    <template #fallback>
                        <!-- this will be rendered on server side -->
                        <p>Loading The Cube...</p>
                    </template>
                    <rubiks-cube ref="three"></rubiks-cube>
                </client-only>
            </section>
            <div class="flex justify-center items-center gap-2">
                <cube-button @click="scramble"> Scramble </cube-button>
                <cube-button @click="reset_camera"> Reset Camera </cube-button>
            </div>
        </div>
    </section>
</template>