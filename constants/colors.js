export const colors = ()=>{
    const { $three } = useNuxtApp()
    const red = new $three.Color(0xff0000)
    const blue = new $three.Color(0x0000ff)
    const green = new $three.Color(0x00ff00)
    const yellow = new $three.Color(0xffff00)
    const orange = new $three.Color(0xffa500)
    const white = new $three.Color(0xffffff)
    const BLACK_COLOR = new $three.Color(0x000000)
    return [
        white,
        red,
        blue,
        green,
        yellow,
        orange,
    ]
}