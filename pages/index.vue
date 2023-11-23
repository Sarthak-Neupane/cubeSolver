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

const clickedF = ()=>{
    F_clicked.value++
    // three.value.F = F_clicked.value
    three.value.rotate('F')
}
const clickedB = ()=>{
    B_clicked.value++
    three.value.rotate('B')
}
const clickedR = ()=>{
    R_clicked.value++
    three.value.rotate('R')
}
const clickedL = ()=>{
    L_clicked.value++
    three.value.rotate('L')
}
const clickedU = ()=>{
    U_clicked.value++
    three.value.rotate('U')
}
const clickedD = ()=>{
    D_clicked.value++
    three.value.rotate('D')
}
const clickedMv = ()=>{
    MV_clicked.value++
    three.value.rotate('MV')
}
const clickedMh = ()=>{
    MH_clicked.value++
    three.value.rotate('MH')
}

</script>

<template>
    <button class="mr-4" @click="clickedF">Click F</button>
    <button class="mr-4" @click="clickedB">Click B</button>
    <button class="mr-4" @click="clickedR">Click R</button>
    <button class="mr-4" @click="clickedL">Click L</button>
    <button class="mr-4" @click="clickedU">Click U</button>
    <button class="mr-4" @click="clickedD">Click D</button>
    <button class="mr-4" @click="clickedMv" > Click Middle Vertical </button>
    <button class="mr-4" @click="clickedMh" > Click Middle Horizontal </button>
    <client-only>
        <rubiks-cube ref="three" ></rubiks-cube>
    </client-only>
</template>