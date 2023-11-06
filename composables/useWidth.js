import { useWindowSize } from '@vueuse/core'

export const useWidth = () => {
  const { width, height } = useWindowSize()
  console.log('width', width.value)
  console.log('height', height.value)

  if (width.value < 640) {
    return 640
  } else if (width.value < 768) {
    return 768
  } else if (width.value < 1024) {
    return 1024
  } else if (width.value < 1280) {
    return 1280
  } else if (width.value < 1536) {
    return 1536
  } else if (width.value < 1920) {
    return 1920
  } else {
    return 2560
  }
}