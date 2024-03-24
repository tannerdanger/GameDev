import { ASSETMANAGER, RENDERER, UTIL } from "../Engine/engine.js"
import Planet_Defender_Entity from "./DefenderEntitity.js"
import CONST from "./const.js"


export default class Planet extends Planet_Defender_Entity {
    constructor(){
        super("PLANET")

        Object.assign(this, CONST.PLANET)

        

        this.x = RENDERER.getCenter().x - this.width
        this.y = RENDERER.getCenter().y - this.height;

        this.image = ASSETMANAGER.getAsset(this.ASSETS[0])

        this.isDebug = false;
    }

}

export class Star{
    constructor(){
        this.x = UTIL.GetRandomInt(0, RENDERER.width);
        this.y = UTIL.GetRandomInt(0, RENDERER.height);
        this.speed = UTIL.GetRandomInt(10, 15)
        this.radius = UTIL.GetRandomInt(8, 16)
        
    }
    update(dt){
        this.x -= this.speed * dt
        this.y += this.speed * dt

        if(this.x + this.radius < 0){
            this.x = RENDERER.width
        }else if(this.x > RENDERER.width){
            this.x = -this.radius
        }

        if(this.y + this.radius < 0){
            this.y = RENDERER.height
        }else if(this.y > RENDERER.height){
            this.y = -this.radius
        }

    }

    draw(img){
        RENDERER.ctx.drawImage(img, this.x, this.y, this.radius, this.radius)
    }
}

