import ASSETMANAGER from "../../Engine/systems/assetSystem.js";
import RENDERER from "../../Engine/systems/renderSystem.js";


class Mario {
    constructor() {
        this.animation = null;
        this.width = 16;
        this.height = 16;
        this.x =  0;//(RENDERER.width / 2) - (this.width / 2); //middle of canvas
        this.y = 0;(RENDERER.height / 2) - (this.height / 2);//middle of canvas
        this.makeBig();
        this.frameTimer = 0.5;
    }

    //TODO: Crop Image into individual frames without padding
    init() {
        let img = ASSETMANAGER.getAsset("../assets/sprites/mario.png")
        let scale = RENDERER.gameScale;

        this.standingBig = new Animation(
            img,
            16,
            32,
            1,
            1,
            1,
            scale
        )

        this.running = new Animation(
            img,
            16,
            32,
            1,
            2,
            3,
            scale,
        )

        //this.animation = this.standingBig;
        this.animation = this.running;
        //this.testAnimation = this.StandingBig2;
        

         this.x = (RENDERER.width / 2) - (this.width / 2); //middle of canvas
         this.y = (RENDERER.height / 2) - (this.height / 2);//middle of canvas

        // this.frameX = 0;
        // this.frameY = 1;

    }

    makeBig() {
        this.height *= 2;
    }
    makeSmall() {
        this.height /= 2;
    }

    update(dt) {
        //console.log("Mario Update" + this.frameTimer)
        this.frameTimer -= dt
        if (this.frameTimer < 0) {
            this.animation.advanceFrame()
            this.frameTimer = 0.5
        }

    }

    draw() {
        this.animation.drawFrame(this.x, this.y); //TODO: Send in w and h to override frame size?
        //this.testAnimation.drawFrame(this.x + this.width * 5, this.y)
    }
}

class Animation {
    constructor(img, 
        frameWidth, frameHeight, 
        startY, startX,
        frameCount, scale)
        {
        this.srcSheet = img;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        //starting references for the beginning of the animation
        this.startY = startY;
        this.startX = startX;
        //reference for the current animation frame
        this.frameX = startX;
        this.frameY = startY;
        this.frameCount = frameCount || 1;
        this.scale = scale || ASSETMANAGER.gameScale;
    }

    draw(x,y){
        this.drawFrame(x, y);
    }

    drawFrame(x, y){
        RENDERER.ctx.drawImage(
            this.srcSheet,
            this.frameX * this.frameWidth + 2,
            this.frameY, //* this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            x,
            y,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale
        )
    }

    /*
     * TODO: If animation is two rows+, advance Y...use frame count as comparison
     */
    advanceFrame(){
        this.frameX ++;
        if (this.frameX > this.frameCount){
            this.frameX = this.startX;
        }
    }


}

// class Frame{
//     constructor(){
//         this.width = 16;
//         this.height = 16;
//     }
// }

// class SpriteSheet{
//     constructor(img, frameW, frameH){
//         this.img = img;
//         this.frameWidth = frameW;
//         this.frameHeight = frameH;
//         this.frameX = 0;
//         this.frameY = 0;
//         this.scale = RENDERER.gameScale;
//     }


//     draw(x, y){ //x and y pos for drawing sent from the entity object
//         console.log("Draw")
//         RENDERER.ctx.drawImage(this.img,
//             1.5 + this.frameX * this.frameWidth, 1 + this.frameY * this.frameHeight, 16, 16,
//             x, y, this.frameWidth * this.scale, this.frameHeight * this.scale
//         )
//     }
// }

var MARIO = new Mario();
export default MARIO;