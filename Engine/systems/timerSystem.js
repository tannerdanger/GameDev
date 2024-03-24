import System from "./system.js";

export default class Timer extends System {
    constructor() {
        super("TIMER")
        this.gameTime = 0
        this.maxStep = 0.05
        this.wallLastTimestamp = 0
    }

    setFPS(fps) {
        this.maxStep = fps / 1000;
        console.log(this.maxStep)
    }

    start() {
        this.wallLastTimestamp = 0;
    }

    tick() {
        const wallCurrent = Date.now()
        const wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000
        this.wallLastTimestamp = wallCurrent

        const gameDelta = Math.min(wallDelta, this.maxStep)
        this.gameTime += gameDelta
        return gameDelta
    }

    getGameTIme() {
        return this.gameTime
    }
}

/**
 * if frameskip > fps {
 *  draw()
 *  frameskip = 0.0
 * }
 * 
 * This might already be capped in the timer
 * 
 * GAMETIMER.setFPS(30) //TODO: This?
 * 
 */