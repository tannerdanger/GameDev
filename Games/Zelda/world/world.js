import ASSETMANAGER from "../../Engine/systems/assetSystem.js";
import INPUT from "../../Engine/systems/inputSystem.js";
import RENDERER from "../../Engine/systems/renderSystem.js";
import CNST from "../const.js";
import LINK from "./link.js"
import { collidesRectagnles } from "../../Engine/systems/collision.js";


class World {
    constructor() {
        // this.MAP = null
        this.MAP = null;
    }

    init() {
        LINK.init();
        this.MAP = new Light_World_Map();

    }

    update(dt) {
        // if(INPUT.clickPos.x != 0){
        //     console.log(INPUT.clickPos)


        //     if(collidesRectagnles(
        //         {x: INPUT.mousePos.x, y: INPUT.mousePos.y, w: 0, h: 0},
        //         RENDERER.scaleDimension(scenes.x0y0.obj)
        //         )){
        //             console.log("True")
        //         }
        //         else {
        //             console.log("False")
        //         }
        // }
        this.MAP.update(dt);
    }

    draw() {
        this.MAP.draw();
        // RENDERER.ctx.drawImage(this.MAP, 
        //     this.x, 
        //     this.y, 
        //     this.ScaledW, this.ScaledH);
    }
}

class MapScene {
    constructor(x, y, origin, h, w) {
        /** @type {Object} the x and y pos of the origin of this scene */
        this.origin = origin;
        /** @type {Number} the width of the scene, scaled to the size of the canvas */
        this.width = w * RENDERER.gameScale;
        /** @type {Number} the height of the scene, scaled to the size of the canvas */
        this.height = h * RENDERER.gameScale;
        this.entities = {}
        this.collidables = {}
    }

    update(dt) {
        //update entities
    }
    draw() {
        //draw entities
    }
    on_scene_enter() { }
    on_scene_exit() { }
}


class Light_World_Map {
    constructor() {
        this.img = ASSETMANAGER.getAsset(CNST.ASSETS.MAPS.OW_LIGHT);
        console.log(typeof this.img)
        this.segments = [
            [new MapScene(0, 0, { x: 0, y: 512 }, 256, 512), new MapScene(1, 0, { x: 2828, y: 768 }, 256, 256), new MapScene(2, 0, { x: 3086, y: 0 }, 1142, 1027)],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],

        ]
        //this.camera = { x: 0, y: -512 * RENDERER.gameScale }
        this.ScaledW = this.img.width * RENDERER.gameScale;
        this.ScaledH = this.img.height * RENDERER.gameScale;

        this.isScrolling = false;
        this.scrollToPos = {x: 0, y: 0};
        this.scrollSpeed = 300;
    }



    update(dt) {
        console.log("Camera Y" + this.camera.y)
        
        if (this.isScrolling) {
            
            var run = this.camera.x - this.scrollToPos.x;
            var rise = this.camera.y - this.scrollToPos.y;
            var len = Math.sqrt((rise * rise) + (run * run));
            var unitX = run / len
            var unitY = rise / len
            this.camera.x += unitX * (this.scrollSpeed * dt)
            this.camera.y += unitY * (this.scrollSpeed * dt)

            // console.log("Camera Y" + this.camera.y)
            // console.log("Scroll To Y: " + this.scrollToPos.y)
            // console.log("run: " + run);
            // console.log("rise: " + rise);
            // console.log("unitX : " + unitX)
            // console.log("unitY : " + unitY)

            //snap to, if within 5
            // if(this.camera.y - this.scrollToPos.y > 5){
            //     this.camera.y = -this.scrollToPos.y
            //     this.camera.x = this.scrollToPos.x
            //     this.isScrolling = false
            // }

        } else {

            if (INPUT.isKeyDown(INPUT.KEYS.KeyA)) {
                this.scroll_scene_left();

            } else if (INPUT.isKeyDown(INPUT.KEYS.KeyD)) {
                this.scroll_scene_right();
            }


            if (INPUT.isKeyDown(INPUT.KEYS.KeyW)) {
                this.scroll_scene_up();


            } else if (INPUT.isKeyDown(INPUT.KEYS.KeyS)) {
                this.scroll_scene_down();
            }
        }

    }

    draw() {
        RENDERER.ctx.drawImage(this.img, this.camera.x, this.camera.y, this.ScaledW, this.ScaledH)
        RENDERER.ctx.drawImage(LINK.img, LINK.x + this.camera.x, LINK.y + this.camera.y, LINK.width, LINK.height)
    }

    scroll_scene_up() {
        console.log("Scrolling")
        this.isScrolling = true
        this.scrollToPos = {x : 0, y: -512 * RENDERER.gameScale}
    }
    scroll_scene_down() {
        console.log("Scrolling")
        this.isScrolling = true
        this.scrollToPos = {x: 1, y: 1027 * RENDERER.gameScale}
    }
    scroll_scene_left() {

    }
    scroll_scene_right() {

    }


}

const scenes = {
    TITLE: {
        x: 0,
        y: 0,
    },
    x0y0: {
        x: 0,
        y: 512,
        h: 518,
        w: 266,

        obj: {
            plaque: {
                x: 104,
                y: 648,
                h: 32,
                w: 32
            }
        }
    }

}

/*

class MapScene{
    constructor(img){
        this.img = img//ASSETMANAGER.getAsset(CNST.ASSETS.MAPS.LIGHT.x0y0);
        this.width = this.img.width * RENDERER.gameScale;
        this.height = this.img.height * RENDERER.gameScale;
        this.x = 0;
        this.y = 0;
        this.scrollDirY = 0;
        this.scrollDirX = 0;
        this.scrollDist = 0;
        this.isScrolling = false;
        this.scrollSpeed = 500;
    }

    update(dt){
        console.log(this.scrollDist)
        if(this.scrollDist != 0){
            let dx, dy = 0
            if(this.scrollDist < 2){
                dx = (this.scrollDist * this.scrollDirX)
                dy = (this.scrollDist * this.scrollDirY)
                this.scrollDist = 0;
                this.isScrolling = false;
            } else {
                dx = (this.scrollSpeed * this.scrollDirX) * dt
                dy = (this.scrollSpeed * this.scrollDirY) * dt
                this.scrollDist -= Math.abs(dx + dy)
            }
            this.x += dx
            this.y += dy

            LINK.x += dx
            LINK.y += dy
        }
    }
    dist_to_bottom(){
        return (this.height - (-(this.y - RENDERER.canvas.height)))
    }

    dist_to_top(){
        return (0 - this.y)
    }

    collision_left(){
        //console.log("Collision Left")
    }

    collision_right(){
        //console.log("TOUCHING RIGHT");
    }

    collision_top(){
        this.scrollDist = Math.min(this.dist_to_top(), RENDERER.canvas.height / 2)
        if(this.scrollDist > 0){
            this.scrollDirY = 1
            this.isScrolling = true;
        }
    }

    collision_bot(){
        this.scrollDist = (Math.min(this.dist_to_bottom(), RENDERER.canvas.height / 2))
        if(this.scrollDist > 0){
            this.scrollDirY = -1;
            this.isScrolling = true;
        }
    }

    draw(){
        RENDERER.ctx.drawImage(this.img,
            this.x, this.y,
            this.width, this.height)
    }


}

class Light_x0_y0 extends MapScene{
    constructor(){
        super(ASSETMANAGER.getAsset(CNST.ASSETS.MAPS.LIGHT.x0y0))
    }
    update(dt){

        if((LINK.x - LINK.width / 2) )


        super.update(dt);
    }
}

class Light_x0_y1 extends MapScene{
    constructor(){
        super(ASSETMANAGER.getAsset(CNST.ASSETS.MAPS.LIGHT.x0y1))
    }
}
*/


var WORLD = new World();
export default WORLD;