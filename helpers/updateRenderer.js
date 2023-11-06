export const updateRenderer = (renderer, options) => {
    renderer.setSize(options.size.width, options.size.height)
    renderer.setPixelRatio(options.pixelRatio)
    renderer.render(options.scene, options.camera)
  }