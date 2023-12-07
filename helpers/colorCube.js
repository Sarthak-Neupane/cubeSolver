export const colorCube = (type, pos)=>{
    const { $three } = useNuxtApp()  // plugins
    const { i, j, k } = pos
    let exactCube = null
    
    const red_texture = new $three.TextureLoader().load('./static/Cube/red.png')
    const blue_texture = new $three.TextureLoader().load('./static/Cube/blue.png')
    const green_texture = new $three.TextureLoader().load('./static/Cube/green.png')
    const yellow_texture = new $three.TextureLoader().load('./static/Cube/yellow.png')
    const orange_texture = new $three.TextureLoader().load('./static/Cube/orange.png')
    const white_texture = new $three.TextureLoader().load('./static/Cube/white.png')
    const black_texture = new $three.TextureLoader().load('./static/Cube/black.png')

    const cubeThreeFaces = [
        { x: -1, y: -1, z: -1, textures: [black_texture, orange_texture, black_texture, yellow_texture, black_texture, white_texture] },
        { x: 1, y: -1, z: -1, textures: [green_texture, black_texture, black_texture, yellow_texture, black_texture, white_texture] },
        { x: -1, y: 1, z: -1, textures: [black_texture, orange_texture, red_texture, black_texture, black_texture, white_texture] },
        { x: 1, y: 1, z: -1, textures: [green_texture, black_texture, red_texture, black_texture, black_texture, white_texture] },
        { x: -1, y: -1, z: 1, textures: [black_texture, orange_texture, black_texture, yellow_texture, blue_texture, black_texture] },
        { x: 1, y: -1, z: 1, textures: [green_texture, black_texture, black_texture, yellow_texture, blue_texture, black_texture] },
        { x: -1, y: 1, z: 1, textures: [black_texture, orange_texture, red_texture, black_texture, blue_texture, black_texture] },
        { x: 1, y: 1, z: 1, textures: [green_texture, black_texture, red_texture, black_texture, blue_texture, black_texture] }
    ]
    
    const cubeTwoFaces = [
        { x: 0, y: 1, z: 1, textures: [black_texture, blue_texture, black_texture, red_texture, black_texture, black_texture] },
        { x: 0, y: -1, z: 1, textures: [black_texture, blue_texture, yellow_texture, black_texture, black_texture, black_texture] },
        { x: 1, y: 0, z: 1, textures: [black_texture, blue_texture, black_texture, black_texture, black_texture, green_texture] },
        { x: -1, y: 0, z: 1, textures: [black_texture, blue_texture, black_texture, black_texture, orange_texture, black_texture] },
        { x: 0, y: 1, z: -1, textures: [white_texture, black_texture, black_texture, red_texture, black_texture, black_texture] },
        { x: 0, y: -1, z: -1, textures: [white_texture, black_texture, yellow_texture, black_texture, black_texture, black_texture] },
        { x: 1, y: 0, z: -1, textures: [white_texture, black_texture, black_texture, black_texture, black_texture, green_texture] },
        { x: -1, y: 0, z: -1, textures: [white_texture, black_texture, black_texture, black_texture, orange_texture, black_texture] },
        { x: 1, y: 1, z: 0, textures: [black_texture, black_texture, black_texture, red_texture, black_texture, green_texture] },
        { x: 1, y: -1, z: 0, textures: [black_texture, black_texture, yellow_texture, black_texture, black_texture, green_texture] },
        { x: -1, y: 1, z: 0, textures: [black_texture, black_texture, black_texture, red_texture, orange_texture, black_texture] },
        { x: -1, y: -1, z: 0, textures: [black_texture, black_texture, yellow_texture, black_texture, orange_texture, black_texture] },
    ]
    
    const cubeSingleFaces = [
        { x: 0, y: 0, z: 1, map: blue_texture },
        { x: 0, y: 0, z: -1, map: white_texture },
        { x: 0, y: 1, z: 0, map: red_texture },
        { x: 0, y: -1, z: 0, map: yellow_texture },
        { x: 1, y: 0, z: 0, map: green_texture },
        { x: -1, y: 0, z: 0, map: orange_texture },
    ]

    if(type == 'corner'){
        exactCube = cubeThreeFaces.find((e) => e.x === i && e.y === j && e.z === k)
        return exactCube
    } else if(type == 'face'){
        exactCube = cubeTwoFaces.find((e) => e.x === i && e.y === j && e.z === k)
        return exactCube
    } else if(type == 'center'){
        exactCube = cubeSingleFaces.find((e) => e.x === i && e.y === j && e.z === k)
        return exactCube
    }
    
}