
import ENGINE from "../../Engine/engine.js"
import ASSETMANAGER from "../../Engine/systems/assetSystem.js";
import RENDERER from "../../Engine/systems/renderSystem.js"
import MARIO from "./mario.js";

/**
 * VARIABLES
 */
const NESwidth = 265;
const NESheight = 240;

/**
 * SYSTEM SETUP
 */
ENGINE.drawCallback = draw
ENGINE.updateCallback = update
RENDERER.setDisplay(NESwidth, NESheight, true)

ASSETMANAGER.loadAssets([
    "../assets/maps/bg-1-1.png",
    "../assets/sprites/mario.png"
])

await ASSETMANAGER.waitLoad();
// var MARIO = ASSETMANAGER.getAsset("../assets/sprites/mario.png");
var BG = ASSETMANAGER.getAsset("../assets/maps/bg-1-1.png");

MARIO.init();


function draw(){
    //RENDERER.DrawImage(BG, 0, 0, RENDERER.width * RENDERER.gameScale, RENDERER.height * RENDERER.gameScale);
    //RENDERER.DrawImage(BG, 0, 0, RENDERER.width, RENDERER.height)
    
    MARIO.draw();
}

function update(dt){
    MARIO.update(dt);
}

ENGINE.start();