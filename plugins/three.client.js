import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('three', THREE);
    nuxtApp.provide('orbitControls', OrbitControls);
    nuxtApp.provide('gltfLoader', GLTFLoader);
    return
});