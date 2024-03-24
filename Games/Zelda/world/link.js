import ASSETMANAGER from "../../Engine/systems/assetSystem.js";
import RENDERER from "../../Engine/systems/renderSystem.js";
import CNST from "../const.js";
import INPUT from "../../Engine/systems/inputSystem.js";
import WORLD from "./world.js";


class Link{
    constructor(){
        this.img = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speed = 0;
    }

    init(){
        this.img = ASSETMANAGER.getAsset(CNST.ASSETS.CHARACTERS.TEST);
        this.x = RENDERER.canvas.width / 2;
        this.y = RENDERER.canvas.height / 2;
        this.width = this.img.width * RENDERER.gameScale;
        this.height = this.img.height * RENDERER.gameScale;
        this.speed = 500
    }

    update(dt){
        //LEFT SCREEN COLLISION
        if (INPUT.isKeyDown(INPUT.KEYS.KeyA)){
            this.x -= this.speed * dt;
            if(this.x <= 0){
                WORLD.CURRENT_SCENE.collision_left();
                this.x += (this.speed * dt) + 10;
            }
            //RIGHT SCREEN COLLISION
        } else if(INPUT.isKeyDown(INPUT.KEYS.KeyD)){
            this.x += this.speed * dt;
            if(this.x + this.width >= RENDERER.canvas.width){
                WORLD.CURRENT_SCENE.collision_right();
                this.x -= (this.speed * dt) + 10;
            }
        }

        //TOP SCREEN COLLISION
        if(INPUT.isKeyDown(INPUT.KEYS.KeyW)){
            this.y -= (this.speed * dt);
            if(this.y <= 0){
                WORLD.CURRENT_SCENE.collision_top();
                this.y += (this.speed * dt) + 10;
            }
            //BOT SCREEN COLLISION
        }else if(INPUT.isKeyDown(INPUT.KEYS.KeyS)){
            this.y += (this.speed * dt);
            if(this.y + this.height >= RENDERER.canvas.height){
                WORLD.CURRENT_SCENE.collision_bot();
                this.y -= (this.speed * dt) + 10;
            }
        }
        
    }



    draw(){
        RENDERER.ctx.drawImage(this.img,
            this.x, this.y,
            this.width, this.height
            )
    }
}

var PLAYER = new Link();
export default PLAYER;