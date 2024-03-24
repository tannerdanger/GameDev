import { ASSETMANAGER, RENDERER, UTIL } from "../Engine/engine.js";
import Planet_Defender_Entity from "./DefenderEntitity.js";


var DEFAULT_PLANET_DISTANCE = 100

export default class Asteroid extends Planet_Defender_Entity {
    constructor(params){
        super("ASTEROID-" + params.size )

        Object.assign(this, params)

        this.x = UTIL.GetRandomInt(0, RENDERER.width);
        this.y = UTIL.GetRandomInt(0, RENDERER.height);

        // this.radius += DEFAULT_PLANET_DISTANCE

        // //check if too close to planet
        // // while(this.collidesCircle(PLANET)){
        // //     console.log("Repositioning")
        // //     this.x = UTIL.GetRandomInt(0, RENDERER.width);
        // //     this.y = UTIL.GetRandomInt(0, RENDERER.height);
        // // }        
        
        // this.radius -= DEFAULT_PLANET_DISTANCE

        this.image = ASSETMANAGER.getAsset(params.ASSETS[UTIL.GetRandomInt(0, 2)])

        this.rotationalVelocity = UTIL.GetRandomInt(-50, 50)
        this.angularVelocityY = UTIL.GetRandomInt(-35, 35)
        this.angularVelocityX = UTIL.GetRandomInt(-35, 35)

        this.isDebug = false
    }

    update(dt){
        super.update(dt)
        this.angle += this.rotationalVelocity * dt
        this.x += this.angularVelocityX * dt
        this.y += this.angularVelocityY * dt
    }

    onCollision(e){
        //ASTEROIDS = ASTEROIDS.filter(a => a.uuid != this.uuid)
    }
}