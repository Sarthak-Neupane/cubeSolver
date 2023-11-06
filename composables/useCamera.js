export const useCamera = options => {
    const nuxtApp = useNuxtApp()
  
    let camera
    if (options.cameraType == 'Perspective') {
      camera = new nuxtApp.$three.PerspectiveCamera(
        options.fov,
        options.aspect,
        options.near,
        options.far
      )
      camera.position.set(options.position.x, options.position.y, options.position.z)
    } else {
      camera = new nuxtApp.$three.OrthographicCamera(options)
    }
    return camera
  }