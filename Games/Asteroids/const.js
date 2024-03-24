
const CNST = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 800,

    ASSETS: [
        //0
        "../Asteroids/Assets/Asteroid_L1.png",
        "../Asteroids/Assets/Asteroid_L2.png",
        "../Asteroids/Assets/Asteroid_L3.png",
        //1
        "../Asteroids/Assets/Asteroid_M1.png",
        "../Asteroids/Assets/Asteroid_M2.png",
        "../Asteroids/Assets/Asteroid_M3.png",
        //2
        "../Asteroids/Assets/Asteroid_S1.png",
        "../Asteroids/Assets/Asteroid_S2.png",
        "../Asteroids/Assets/Asteroid_S3.png",
        //ship
        "../Asteroids/Assets/SpaceShip_1.png",  //engine off
        "../Asteroids/Assets/SpaceShip_2.png",  //engine on
        //projectile
        "../Asteroids/Assets/Dot_L.png"
    ],



    ASTEROIDS: {
        LARGE: {
            height: 160,
            width: 160,
            radius: 140,
            size: "LARGE",
            ASSETS: [
                "../Asteroids/Assets/Asteroid_L1.png",
                "../Asteroids/Assets/Asteroid_L2.png",
                "../Asteroids/Assets/Asteroid_L3.png",
            ]
        },
        MEDIUM: {
            height: 96,
            width: 96,
            radius: 70,
            size: "MEDIUM",
            ASSETS: [
                "../Asteroids/Assets/Asteroid_M1.png",
                "../Asteroids/Assets/Asteroid_M2.png",
                "../Asteroids/Assets/Asteroid_M3.png",
            ]
        },
        SMALL: {
            height: 64,
            width: 64,
            radius: 45,
            size: "SMALL",
            ASSETS: [
                "../Asteroids/Assets/Asteroid_S1.png",
                "../Asteroids/Assets/Asteroid_S2.png",
                "../Asteroids/Assets/Asteroid_S3.png",
            ]
        }
    },

    PLAYER: {
        height: 64,
        width: 96,
        ASSETS: [
            "../Asteroids/Assets/SpaceShip_1.png",
            "../Asteroids/Assets/SpaceShip_2.png",
        ]
    }
}

export default CNST