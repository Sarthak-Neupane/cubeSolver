export const updateCamera = (camera, options) => {
    camera.aspect = options.aspect
    camera.fov = options.fov
    camera.updateProjectionMatrix()
}