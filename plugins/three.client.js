import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('three', THREE);
    nuxtApp.provide('orbitControls', OrbitControls);
    console.log('three.client.js');
    return
});