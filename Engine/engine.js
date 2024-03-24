import Utilities from "./util.js"
import AssetManager from "./systems/assetSystem.js";
import InputManager from "./systems/inputSystem.js";
import Renderer from "./systems/renderSystem.js";
import Timer from "./systems/timerSystem.js";



class Engine {
    constructor() {
        this.requestAnimFrame = getPlatformRAF().bind(window)
        this.dt = 0;
    }

    async start(game) {
        console.log("Starting")
        this.game = game
        if (this.checkGameIsValid()) {
            await this.game.load();
            GAMETIMER.start()
            this.loop();
        }
    }

    loop() {
        //draw setup
        this.dt = GAMETIMER.tick();

        this.update(this.dt);
        this.draw();
        this.requestAnimFrame(this.loop.bind(this), window)

    }

    update(dt) {
        // this.updateCallback();
        this.frameskip += dt
        this.game.update(dt);
    }

    draw() {
        RENDERER.clear();
        this.game.draw();
        RENDERER.restore();
    }

    /**
     * 
     * @returns {Boolean} True if game engine is ready
     */
    checkReady() {
        var isInit = true
        if (!ASSETMANAGER.isInit()) {
            isInit = false;
            console.log("Asset Manager Failied to Initialize");
        }
        if (!RENDERER.isInit()) {
            isInit = false;
            console.log("Renderer Failed to Initialize");
        }
        if (!INPUT.isInit()) {
            isInit = false;
            console.log("Input System Failed to Initialize");
        }


        if (isInit) {
            console.log("All Systems Go!")
        } else {
            console.log("Engine not ready to start :/")
        }

        return isInit;
    }
    checkGameIsValid() {
        if (this.game.update === null || this.game.draw === null || this.game.load == null) {
            console.log("callbacks not set!");
            return false
        }
        return true
    }
}

/**
 * Returns the Request Animation Frame method for the current browser/platform
 * @returns {Function}
 */
function getPlatformRAF() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        // eslint-disable-next-line no-unused-vars
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60)
        }
}



//SYSTEMS
var UTIL = new Utilities();
var ASSETMANAGER = new AssetManager();
var RENDERER = new Renderer();
var GAMETIMER = new Timer();
var INPUT = new InputManager();
var ENGINE = new Engine();


function initAll() {
    ASSETMANAGER.init();
    RENDERER.init();
    GAMETIMER.init();
    INPUT.init();
    ENGINE.init();
}

async function waitInit() {
    
    var isInit = true
    var attemptsRemain = 5

    do{
        if (!ASSETMANAGER.checkInit()) {
            isInit = false
            console.log("Asset Manager Failied to Initialize");
            ASSETMANAGER.init();
        }
        if (!RENDERER.checkInit()) {
            isInit = false
            console.log("Renderer Failied to Initialize");
            RENDERER.init();
        }
        if (!GAMETIMER.checkInit()) {
            isInit = false
            console.log("Game Timer Failed to Initialize")
            GAMETIMER.init();
        }
        if (!INPUT.checkInit()) {
            isInit = false
            console.log("Input Failed to Initialize")
            INPUT.init();
        }
        if(isInit){
            console.log("ALL SYSTEMS GO!")
        } else {
            attemptsRemain--
        }
    }while(!isInit && attemptsRemain > 0)

}

await waitInit();

export { ENGINE, ASSETMANAGER, RENDERER, UTIL, INPUT, GAMETIMER }