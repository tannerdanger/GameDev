/**
 * UPDATE: Removed Callbacks, added a function to wait load
 */
import System from "./system.js";


export default class AssetManager extends System{
    constructor() {
        super("AssetManager")
        this.assets = {}
        this.queueLen = 0;
    }


    getAsset(src){
        //TODO: Smoother way to retrieve assets without entire filepath
        return this.assets[src]
    }

    /**
     * Load a bunch of assets from an array of asset paths
     * @param {[src]} srcArray 
     */
     loadAssets(srcArray){

        if (!srcArray) return
        
        for(let i = 0; i < srcArray.length; i++){
            this.loadAsset(srcArray[i])
        }
    }

    
    loadAsset(src) {
        this.queueLen++;
        var that = this;
        var imageObj = new Image();
        imageObj.src = src;
        imageObj.onload = function () {
            that.assets[src] = this;
            that.queueLen--;
        };
    }

    async waitLoad(){
        while(this.queueLen > 0){
            console.log("Waiting for " + this.queueLen +" assets to complete loading");
            await new Promise(r => setTimeout(r, this.queueLen * 200));
        }
    }


    async runTest(){
        console.log("Starting test")

        //Method 1
        this.loadAssets([
            "./assets/maps/bg-1-1.png",
            "./assets/sprites/mario.png",
        ]);
        
        await this.waitLoad();

        let asset = this.getAsset("./assets/sprites/mario.png")

        if(!asset){
            console.log("Failed to load asset")
        }

        super.runTest()
    }
}