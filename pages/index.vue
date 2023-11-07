<script setup>
import { useWindowSize, useDevicePixelRatio, useRafFn } from '@vueuse/core'

const F_clicked = ref(0)
const B_clicked = ref(0)
const R_clicked = ref(0)
const L_clicked = ref(0)
const U_clicked = ref(0)
const D_clicked = ref(0)

const clickedF = ()=>{
    F_clicked.value++
}
const clickedB = ()=>{
    B_clicked.value++
}
const clickedR = ()=>{
    R_clicked.value++
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
    <button @click="clickedF">Click F</button>
    <button @click="clickedB">Click B</button>
    <button @click="clickedR">Click R</button>
    <button @click="clickedL">Click L</button>
    <button @click="clickedU">Click U</button>
    <button @click="clickedD">Click D</button>
    <client-only>
        <three-background :F="F_clicked" :B="B_clicked" :R="R_clicked" :L="L_clicked" :U="U_clicked" :D="D_clicked"  ></three-background>
    </client-only>
</template>