import { INPUT, RENDERER } from "./Engine/engine.js";
import Game from "./Engine/world/game.js";


class GameTest extends Game {
    constructor(){
        super("TEST")

        RENDERER.setDisplay(500, 500, true)

        this.c1 = {
            x : 100,
            y : 100,
            radius : 25,
            color : "white",
        }

        this.c2 = {
            x : 200,
            y : 200,
            radius : 100,
            color : "red"
        }

        
    }

    update(dt){
        if(INPUT.isKeyDown(INPUT.KEYS.KeyD)){
            this.c1.x += 10 * dt
        }
        if(INPUT.isKeyDown(INPUT.KEYS.KeyS)){
            this.c1.y += 10 * dt
        }
        if(collidesCircle(this.c1, this.c2)){
            this.c1.color = "Purple"
        }
    }

    draw(){
        RENDERER.StrokeCircle(this.c1.x, this.c1.y, this.c1.radius, this.c1.color)
        RENDERER.StrokeCircle(this.c2.x, this.c2.y, this.c2.radius, this.c2.color)
    }
}

function collidesCircle(c1, c2){
    return Math.hypot(c1.x - c2.x, c1.y - c2.y) <= c1.radius + c2.radius;
}

var GAME_TEST = new GameTest();
export default GAME_TEST