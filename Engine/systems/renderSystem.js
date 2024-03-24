import System from "./system.js"
/**
 * TODO: Figure out angle conversions on circles
 */


export default class Renderer extends System {
    constructor() {
        super("Renderer");

        /** @type {Canvas} */
        this.canvas = document.getElementById('myCanvas');
        
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.canvas.getContext('2d');

        /** @type {Number} the scale of the game on the screen */
        this.gameScale = 1;
        this.width = 1;
        this.height = 1;

        this.canvascolor = "black"
        
    }


    /**
     * Circles
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius 
     * @param {Color} color 
     * @param {Number} sAngle The start angle of the cirlce, or 0 if full circle
     * @param {Number} eAngle The end angle of the circle, or Math.PI if full circle
     */
    FillCircle(x, y, radius, color, sAngle, eAngle) {
        if (color) {
            this.ctx.fillStyle = color;
        }
        sAngle = sAngle || 0
        eAngle = eAngle || 2 * Math.PI
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, sAngle, eAngle);
        this.ctx.fill();
    }
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} radius 
     * @param {Color} color
     * @param {Number} sAngle The start angle of the cirlce, or 0 if full circle
     * @param {Number} eAngle The end angle of the circle, or Math.PI if full circle
     */
    StrokeCircle(x, y, radius, color, sAngle, eAngle) {
        if (color) {
            this.ctx.strokeStyle = color;
        }
        sAngle = sAngle || 0
        eAngle = eAngle || 2 * Math.PI
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, sAngle, eAngle);
        this.ctx.stroke();
    }

    FillRectangle(x, y, width, height, color){
        if(color){
            this.ctx.fillStyle = color;
        }
        this.ctx.fillRect(x, y, width, height);
    }
    StrokeRectangle(x, y, width, height, color){
        if(color){
            this.ctx.strokeStyle = color;
        }
        this.ctx.strokeRect(x, y, width, height);
    }

    drawImage(img, x, y){
        this.ctx.drawImage(img, x, y)
    }

    // drawImage(img, x, y, width, height, sx, sy){
    //     this.ctx.drawImage(img, x, y, width, height, sx, sy)
    // }
    // drawImage(img, x, y, width, height){
    //     this.ctx.drawImage(img, x, y, width, height)
    // }
    /** END Drawing Shapes */

    setDisplay(w, h, isScaledToFit) {
        if (isScaledToFit) {
            let wMin = ((window.innerWidth - 20) / w);
            let hMin = ((window.innerHeight - 20) / h);
            this.gameScale = Math.min(wMin, hMin)
        }
        this.canvas.width = w * this.gameScale
        this.canvas.height = h * this.gameScale
        this.width = this.canvas.width;
        this.height = this.canvas.height;

    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        //this.FillRectangle(0, 0, this.width, this.height, this.canvascolor)
    }
    restore() {
        this.ctx.restore();
    }

    drawRotatedImage(img,x,y,width,height,deg){
        // Store the current context state (i.e. rotation, translation etc..)
        this.ctx.save()
    
        //Convert degrees to radian 
        var rad = deg * Math.PI / 180;
    
        //Set the origin to the center of the image
        this.ctx.translate(x + width / 2, y + height / 2);
    
        //Rotate the canvas around the origin
        this.ctx.rotate(rad);
    
        //draw the image    
        this.ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
    
        // Restore canvas state as saved from above
        this.ctx.restore();
    }

    getCenter(){
        return {x : this.canvas.width / 2, y : this.canvas.height / 2}
    }


    runTest() {
        this.clear();
        this.FillCircle(20, 20, 10, "Red");
        this.StrokeCircle(20, 50, 10, "Blue");
        this.FillCircle(20, 80, 10, "Orange", 0, 1.5 * Math.PI);
        this.StrokeCircle(20, 110, 10, "Black", 0, 0.5 * Math.PI);
        this.FillRectangle(80, 20, 10, 10, "Green");;
        this.StrokeRectangle(80, 40, 10, 10, "Yellow");
        this.restore();
        super.runTest();
    }

}