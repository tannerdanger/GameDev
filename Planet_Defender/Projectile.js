import { ASSETMANAGER } from "../Engine/engine.js";
import Planet_Defender_Entity from "./DefenderEntitity.js";
import CONST from "./const.js";
import PLANET_DEFENDER_GAME, { PROJECTILES } from "./main.js";

const PROJECTILE_VELOCITY = 400

export default class Projectile extends Planet_Defender_Entity {
    constructor(x, y, angle){
        super("PROJECTILE")

        this.x = x
        this.y = y


        this.angle = angle
        this.angleRad = this.angle / 180 * Math.PI

        Object.assign(this, CONST.PROJECTILE)

        this.image = ASSETMANAGER.getAsset(this.ASSETS[0])
    }

    update(dt){
        
        //let vx = Math.cos(this.angleRad) * this.velocity
        //let vy = Math.sin(this.angleRad) * this.velocity

        this.x += Math.cos(this.angleRad) * (PROJECTILE_VELOCITY * dt)//vx * dt
        this.y += Math.sin(this.angleRad) * (PROJECTILE_VELOCITY * dt)//vy * dt
        //this.x += this.velocity * dt
    }

    onCollision(){
        //PROJECTILES = PROJECTILES.filter(p => p.uuid != this.uuid)
    }
}