<script setup>
import { useWindowSize, useDevicePixelRatio, useRafFn } from '@vueuse/core'

const three = ref(null)

const F_clicked = ref(1)
const B_clicked = ref(1)
const R_clicked = ref(1)
const L_clicked = ref(1)
const U_clicked = ref(1)
const D_clicked = ref(1)

const clickedF = ()=>{
    F_clicked.value++
    // three.value.F = F_clicked.value
    three.value.rotate('F')
}
const clickedB = ()=>{
    B_clicked.value++
}
const clickedR = ()=>{
    R_clicked.value++
    three.value.rotate('R')
}
const clickedL = ()=>{
    L_clicked.value++
}
const clickedU = ()=>{
    U_clicked.value++
}
const clickedD = ()=>{
    D_clicked.value++
}

</script>

<template>
    <button class="mr-4" @click="clickedF">Click F</button>
    <button class="mr-4" @click="clickedB">Click B</button>
    <button class="mr-4" @click="clickedR">Click R</button>
    <button class="mr-4" @click="clickedL">Click L</button>
    <button class="mr-4" @click="clickedU">Click U</button>
    <button class="mr-4" @click="clickedD">Click D</button>
    <client-only>
        <three-background :F="F_clicked" :B="B_clicked" :R="R_clicked" :L="L_clicked" :U="U_clicked" :D="D_clicked" ref="three" ></three-background>
    </client-only>
</template>