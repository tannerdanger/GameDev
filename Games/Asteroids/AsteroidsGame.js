import Game from "../Engine/world/game.js"
import RENDERER from "../Engine/systems/renderSystem.js"
import ASSETMANAGER from "../Engine/systems/assetSystem.js"
import UTILITIES from "../Engine/systems/util.js"
import CNST from "./const.js"

import {PLAYER, Projectile, Asteroid} from "./Entities.js"


class ASTEROIDS_GAME extends Game {
    constructor() {
        super("Asteroids")


        this.asteroids = []
        this.player = []
        this.projectiles = []

        this.SPRITE_SHEET = null;
        this.score = 0;
        RENDERER.setDisplay(CNST.GAME_WIDTH, CNST.GAME_HEIGHT, false)
    }

    async load() {
        ASSETMANAGER.loadAssets(CNST.ASSETS)

        await ASSETMANAGER.waitLoad();


        this.createAsteroids(10);

    }

    update(dt) {
        this.asteroids.forEach(a => {
            a.update(dt);
        });
        this.projectiles.forEach(p => {
            p.update(dt);
        });
        PLAYER.update(dt);

        this.checkCollisions();
    }

    draw() {
        console.log("Draw")
        this.asteroids.forEach(a => {
            a.draw();
        });
        this.projectiles.forEach(p => {
            p.draw();
        });
        PLAYER.draw();
    }

    checkCollisions() {
        this.projectiles.forEach(p => {
            this.asteroids.forEach(a => {
                if (isCollision(p, a)) {
                    console.log("COLLISION!")
                    this.asteroids = this.asteroids.filter(asteroid => asteroid.uuid != a.uuid)
                    this.projectiles = this.projectiles.filter(projectile => projectile.uuid != p.uuid)
                }
            });
        });
    }
    createAsteroids(num) {
        for (let i = 0; i < num; i++) {
            //50% chance
            if (UTILITIES.GetRandomInt(0, 1) % 2 == 0) {
                this.asteroids.push(new Asteroid(CNST.ASTEROIDS.LARGE))
            } else {
                //25% chance or each
                if (UTILITIES.GetRandomInt(0, 1) % 2 == 0) {
                    this.asteroids.push(new Asteroid(CNST.ASTEROIDS.MEDIUM))
                } else {
                    this.asteroids.push(new Asteroid(CNST.ASTEROIDS.SMALL))
                }
            }
        }

    }


}


function isCollision(e1, e2) {
    //first check to see if left edge of either is further to the right than the right edge of the other
    if (e1.x > e2.x + e2.width / 2 || e2.x > e1.x + e1.width / 2) {
        return false
    }

    //then check to see if the bottom edge of either is higher than the top edge of the other
    if (e1.y > e2.y + e2.height / 2 || e2.y > e1.y + e2.height / 2) {
        return false
    }

    return true
}



var ASTEROIDS = new ASTEROIDS_GAME();
export default ASTEROIDS
