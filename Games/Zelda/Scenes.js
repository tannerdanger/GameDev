import ASSETMANAGER from "../Engine/systems/assetSystem.js";
import INPUT from "../Engine/systems/inputSystem.js";
import RENDERER from "../Engine/systems/renderSystem.js";
import CNST from "./const.js";


//16 x 24

/**
 * 
 */
export class Overworld_Light_Scene{
    constructor(){

        this.BackgroundMap = ASSETMANAGER.getAsset(CNST.ASSETS.MAPS.LIGHT.x0y0);
        this.isActive = true;
        //this.x = -2250;
        //this.y = -3900;
        this.x = 0
        this.y = 0
    }

    update(dt){
        //console.log("Input")
        

    }


    draw(){
        // RENDERER.ctx.drawImage(
        //     this.BackgroundMap, 
        //     this.x + (CNST.SNES_DIMS.WIDTH * 2), 
        //     this.y + (CNST.SNES_DIMS.HEIGHT * 2),
            
        //     );
        let scale = 500

        RENDERER.ctx.drawImage(this.BackgroundMap,
            this.x, this.y,
            this.BackgroundMap.width * RENDERER.gameScale, this.BackgroundMap.height * RENDERER.gameScale
            
            )
    }
}