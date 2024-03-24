
const CONST = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 800,

    ASSETS: [
        //0
        "../Planet_Defender/Assets/Asteroid_L1.png",
        "../Planet_Defender/Assets/Asteroid_L2.png",
        "../Planet_Defender/Assets/Asteroid_L3.png",
        //1
        "../Planet_Defender/Assets/Asteroid_M1.png",
        "../Planet_Defender/Assets/Asteroid_M2.png",
        "../Planet_Defender/Assets/Asteroid_M3.png",
        //2
        "../Planet_Defender/Assets/Asteroid_S1.png",
        "../Planet_Defender/Assets/Asteroid_S2.png",
        "../Planet_Defender/Assets/Asteroid_S3.png",
        //ship
        "../Planet_Defender/Assets/SpaceShip_1.png",  //engine off
        "../Planet_Defender/Assets/SpaceShip_2.png",  //engine on
        //projectile
        "../Planet_Defender/Assets/Dot_L.png",
        //Star
        "../Planet_Defender/Assets/Dot_S.png",
        //Spaceship
        //Planet
        "../Planet_Defender/Assets/Planet.png"
    ],



    ASTEROIDS: {
        LARGE: {
            height: 160,
            width: 160,
            radius: 70,
            size: "LARGE",
            ASSETS: [
                "../Planet_Defender/Assets/Asteroid_L1.png",
                "../Planet_Defender/Assets/Asteroid_L2.png",
                "../Planet_Defender/Assets/Asteroid_L3.png",
            ]
        },
        MEDIUM: {
            height: 96,
            width: 96,
            radius: 40,
            size: "MEDIUM",
            ASSETS: [
                "../Planet_Defender/Assets/Asteroid_M1.png",
                "../Planet_Defender/Assets/Asteroid_M2.png",
                "../Planet_Defender/Assets/Asteroid_M3.png",
            ]
        },
        SMALL: {
            height: 64,
            width: 64,
            radius: 25,
            size: "SMALL",
            ASSETS: [
                "../Planet_Defender/Assets/Asteroid_S1.png",
                "../Planet_Defender/Assets/Asteroid_S2.png",
                "../Planet_Defender/Assets/Asteroid_S3.png",
            ]
        }
    },

    PLAYER: {
        height: 64,
        width: 96,
        ASSETS: [
            "../Planet_Defender/Assets/SpaceShip_1.png",
            "../Planet_Defender/Assets/SpaceShip_2.png",
            "../Planet_Defender/Assets/Dot_L.png",
        ]
    },

    PROJECTILE: {
        height: 32,
        width: 32,
        radius: 8,
        ASSETS:[
            "../Planet_Defender/Assets/Dot_L.png"
        ]
    },

    PLANET : {
        height: 96,
        width : 96,
        radius : 40,
        ASSETS : [
            "../Planet_Defender/Assets/Planet.png",
        ]
    },

    STAR : {
        height : 2,
        width : 2,
        radius : 8,
        ASSETS : [
            "../Planet_Defender/Assets/Dot_S.png",
        ]
    }
}

export default CONST