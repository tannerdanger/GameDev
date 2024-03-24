import { RENDERER, UTIL } from "../Engine/engine.js";
import Entitiy from "../Engine/world/entitiy.js";

export default class Planet_Defender_Entity extends Entitiy {
    constructor(name){
        super();
        this.uuid = UTIL.UUID_MANAGER.createUUID().withName(name).withType("ENTITY").build();

        this.dx = 0;
        this.dy = 0;
        this.angle = 0;
        this.velocity = 0;
        this.radius = 0;
        this.isDebug = false;
    }

    update(dt){
        if(this.x + this.width < 0){
            this.x = RENDERER.width
        }else if(this.x > RENDERER.width){
            this.x = -this.width
        }

        if(this.y + this.height < 0){
            this.y = RENDERER.height
        }else if(this.y > RENDERER.height){
            this.y = -this.height
        }
    }

    draw(){
        if(this.angle){
            RENDERER.drawRotatedImage(this.image, this.x, this.y, this.width, this.height, this.angle)
        }else{
            RENDERER.drawImage(this.image, this.x, this.y)
        }

        if(this.isDebug){
            RENDERER.StrokeCircle(this.getCenterX(), this.getCenterY(), this.radius, "blue")
        }
    }

    onCollision(){}

    collidesRectangle(){

    }

    /**
    * Use the builtin Math.hypot function to calculate the distance between 
    * the centers of the two circles. If this is less than or equal the sum 
    * of the radii then the circles overlap.
    * @param {Planet_Defender_Entity} c2 
    * @returns {Boolean} True if collision is made
    */
    collidesCircle(c2){
        return Math.hypot(this.getCenterX() - c2.getCenterX(), this.getCenterY() - c2.getCenterY()) <= this.radius + c2.radius;
    }

    getCenterX(){
        return this.x + (this.width/2)
    }
    getCenterY(){
        return this.y + (this.height/2)
    }
    
}