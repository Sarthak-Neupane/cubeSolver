export const useCamera = options => {
    const nuxtApp = useNuxtApp()
  
    let camera
    if (options.cameraType == 'Perspective') {
      camera = new nuxtApp.$three.PerspectiveCamera(
        options.fov || 75,
        options.aspect || window.innerWidth / window.innerHeight,
        options.near || 0.1,
        options.far || 1000
      )
      camera.position.set(options.position.x, options.position.y, options.position.z)
    } else {
      camera = new nuxtApp.$three.OrthographicCamera(options)
    }
    return camera
  }