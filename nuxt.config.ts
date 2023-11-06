// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from "vite-plugin-glsl";
export default defineNuxtConfig({
  devtools: { enabled: true },
  build:{
    transpile: ["gsap", "three"],
  },
  modules: ["@nuxtjs/tailwindcss"],
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
})
