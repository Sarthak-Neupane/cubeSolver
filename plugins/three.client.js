import * as THREE from 'three';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('three', THREE);
     console.log('three.client.js');
    return
});