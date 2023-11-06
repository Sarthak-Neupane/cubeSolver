export const useRenderer = options => {
    const nuxtApp = useNuxtApp()
    const renderer = new nuxtApp.$three.WebGLRenderer(options.core)
    options.parent.appendChild(renderer.domElement)
    return renderer
  }