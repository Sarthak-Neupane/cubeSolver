// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from "vite-plugin-glsl";
export default defineNuxtConfig({
  devtools: { enabled: true },
  build:{
    transpile: ["gsap", "three"],
  },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/google-fonts'],
  vite: {
    plugins: [
      glsl({
        include: [
          "**/*.glsl",
          "**/*.wgsl",
          "**/*.vert",
          "**/*.frag",
          "**/*.vs",
          "**/*.fs",
        ],
      }),
    ],
  },
  googleFonts: {
    families: {
      'Rubik+Moonrocks': true,
      'Rubik': true,
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
  },
  tailwindcss: {
    // exposeConfig: true,
  },
})
