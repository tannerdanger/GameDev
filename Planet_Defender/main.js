import Game from "../Engine/world/game.js";
import CONST from "./const.js"
import { ASSETMANAGER, RENDERER, UTIL, GAMETIMER } from "../Engine/engine.js";
import Asteroid from "./Asteroid.js";
import Player from "./Player.js";
import Planet, {Star} from "./Planet.js";


export var ASTEROIDS = []
export var PROJECTILES = []
export var STARS = []
export var PLAYER = null
//export var PLANET = null
var LAG = 0.0

class Planet_Defender extends Game {
    constructor() {
        super();
    }

    async load() {
        ASSETMANAGER.loadAssets(CONST.ASSETS)

        RENDERER.setDisplay(800, 800, false)

        await ASSETMANAGER.waitLoad();

        PLAYER = new Player();
        //PLANET = new Planet();

        //reference once for each star
        this.starimage = ASSETMANAGER.getAsset(CONST.STAR.ASSETS[0])

        createAsteroids(10)
        createStars(50)

        this.score = 0;
    }

    update(dt) {

        this.checkCollisions();

        STARS.forEach(element => {
            element.update(dt)
        });

        ASTEROIDS.forEach(element => {
            element.update(dt)
        });
        PROJECTILES.forEach(element => {
            element.update(dt)
        });

        //PLANET.update(dt);

        PLAYER.update(dt);


    }

    draw() {



        STARS.forEach(element => {
            element.draw(this.starimage)
        });

        ASTEROIDS.forEach(element => {
            element.draw();
        });

        //PLANET.draw();

        PROJECTILES.forEach(element => {
            element.draw();
        });

        PLAYER.draw();

        // RENDERER.ctx.fillStyle = "white"
        // RENDERER.ctx.fillText(String(this.score), RENDERER.getCenter().x, 50)

    }

    addProjectile(p){
        if (p === null || p.uuid.name !== "PROJECTILE") return
        PROJECTILES.push(p)
    }

    checkCollisions(){
        PROJECTILES.forEach(p => {
            ASTEROIDS.forEach(a => {
                if(p.collidesCircle(a)){
                    a.onCollision();
                    p.onCollision();

                    PROJECTILES = PROJECTILES.filter(proj => proj.uuid != p.uuid)
                    ASTEROIDS = ASTEROIDS.filter(aster => aster.uuid != a.uuid)
                    
                    return
                }
            });
        });
    }

    /**
     * 
     * @param {uuid} uuid 
     */
    
}

function createAsteroids(num) {
    for (let i = 0; i < num; i++) {
        if (UTIL.GetRandomInt(0, 2) == 1) {
            ASTEROIDS.push(new Asteroid(CONST.ASTEROIDS.LARGE))
        } else {
            if (UTIL.GetRandomInt(0, 2) == 1) {
                ASTEROIDS.push(new Asteroid(CONST.ASTEROIDS.MEDIUM))
            } else {
                ASTEROIDS.push(new Asteroid(CONST.ASTEROIDS.SMALL))
            }
        }
    }
}

function createStars(num){
    for(let i = 0; i < num; i++){
        STARS.push(new Star())
    }
}




var PLANET_DEFENDER_GAME = new Planet_Defender();
export default PLANET_DEFENDER_GAME