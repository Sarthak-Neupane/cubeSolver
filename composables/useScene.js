export const useScene = (options) => {
    const nuxtApp = useNuxtApp()
    const scene = new nuxtApp.$three.Scene(options);
    return scene;

}