import UTILITIES from "../Engine/systems/util.js"
import INPUT from "../Engine/systems/inputSystem.js"
import ASSETMANAGER from "../Engine/systems/assetSystem.js";
import RENDERER from "../Engine/systems/renderSystem.js";
import CNST from "./const.js"
import Entitiy from "../Engine/world/entitiy.js";

export class Astroids_Entity extends Entitiy {
    constructor(name) {
        super()

        this.uuid = UTILITIES.UUID_MANAGER.createUUID().withName(name).withType("Entity").build();

        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
    }

    draw() {
        if (!this.angle) {
            RENDERER.ctx.drawImage(this.image, this.x, this.y)
        } else {
            RENDERER.drawImageRot(this.image, this.x, this.y, this.width, this.height, this.rotate)
        }
    }
}


//TODO: 3 shot burst *pew pew pew*
export class Player extends Astroids_Entity {
    constructor() {
        super("PLAYER")

        Object.assign(this, CNST.PLAYER)

        this.x = RENDERER.width / 2 - this.width;
        this.y = RENDERER.height / 2 - this.height;

        this.velocity = 0;
        this.vy = 0;
        this.vx = 0;


        this.images = {
            OFF: ASSETMANAGER.getAsset(this.ASSETS[0]),
            ON: ASSETMANAGER.getAsset(this.ASSETS[1])
        }

        this.image = this.images.OFF;

        this.angle = 0;

        this.reloadDelay = 0.1;
        this.reloadTimer = 0.1;

    }
    update(dt) {
        if (INPUT.isKeyDown(INPUT.KEYS.ArrowUp)) {
            this.image = this.images.ON

            this.velocity = Math.min(this.velocity + 10*dt, 200)

            this.angleRad = this.rotate / 180 * Math.PI

            this.vx = Math.cos(this.angleRad) * this.velocity
            this.vy = Math.sin(this.angleRad) * this.velocity


        } else {
            this.image = this.images.OFF
        }

        if (INPUT.isKeyDown(INPUT.KEYS.ArrowRight)) {
            this.angle += 5;
        } else if(INPUT.isKeyDown(INPUT.KEYS.ArrowLeft)){
            this.angle -= 5;
        }

        if(INPUT.isKeyDown(INPUT.KEYS.Space)){
           if(this.reloadTimer >= this.reloadDelay){
            ASTEROIDS.projectiles.push(
                new Projectile(
                    this.x + this.width/2,  
                    this.y + 15, 
                    this.rotate)
            )
            this.reloadTimer = 0;
           }else{
            this.reloadTimer += dt
           }
        }
        this.x += this.vx * dt
        this.y += this.vy * dt
    }

}


export class Projectile extends Astroids_Entity {
    constructor(x, y, angle) {
        super("PROJECTILE")

        this.image = ASSETMANAGER.getAsset("../Asteroids/Assets/Dot_L.png")

        this.angleRad = angle / 180 * Math.PI
        this.x = x;
        this.y = y;

        this.speed = 150;

        this.vx = Math.cos(this.angleRad) * this.speed
        this.vy = Math.sin(this.angleRad) * this.speed

        

    }
    update(dt) {
        this.x += this.vx * dt
        this.y += this.vy * dt
    }
}

export class Asteroid extends Astroids_Entity {
    constructor(params) {
        super("ASTEROID_" + params.size)

        Object.assign(this, params)
        //assign random asset
        let asset = params.ASSETS[UTILITIES.GetRandomInt(0, 2)];
        this.image = ASSETMANAGER.getAsset(asset);

        this.x = UTILITIES.GetRandomInt(0, RENDERER.width)
        this.y = UTILITIES.GetRandomInt(0, RENDERER.height)

        this.angularVelocity = UTILITIES.GetRandomInt(0, 5)
    }

    update(dt) {
        this.rotate += this.angularVelocity
    }
}

export var PLAYER;