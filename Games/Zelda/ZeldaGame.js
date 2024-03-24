import ENGINE from "../Engine/engine.js";
import ASSETMANAGER from "../Engine/systems/assetSystem.js";
import RENDERER from "../Engine/systems/renderSystem.js";
import CNST from "./const.js"
import WORLD from "./world/world.js";

export class Game {
    constructor(){
        this.SCENE = null;
        this.name = "zelda"
    }

    async load(){
        ASSETMANAGER.loadAssets([
            CNST.ASSETS.CHARACTERS.LINK,
            CNST.ASSETS.MAPS.OW_DARK,
            CNST.ASSETS.MAPS.OW_LIGHT,
            CNST.ASSETS.MAPS.OW_PYRAMID,
            CNST.ASSETS.CHARACTERS.TEST,

            CNST.ASSETS.MAPS.LIGHT.x0y0

        ])

        RENDERER.setDisplay(CNST.SNES_DIMS.WIDTH, CNST.SNES_DIMS.HEIGHT, true)

        await ASSETMANAGER.waitLoad();
        WORLD.init();

    }



    draw(){
        WORLD.draw();
    }

    update(dt){
        WORLD.update(dt);
    }

}

var ZELDA_GAME = new Game();
await ZELDA_GAME.load();
ENGINE.start(ZELDA_GAME);