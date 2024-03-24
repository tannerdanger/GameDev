import { ASSETMANAGER, INPUT, RENDERER } from "../Engine/engine.js";
import Planet_Defender_Entity from "./DefenderEntitity.js";
import Projectile from "./Projectile.js";
import CONST from "./const.js";
import PLANET_DEFENDER_GAME from "./main.js";

const MAX_VELOCITY = 400;
const ACCELERATION = 10;
const FRICTION = 1;
const RELOAD_TIME = 2;
const SHOT_DELAY = 0.2;
const MAX_SHOTS = 5;

export default class Player extends Planet_Defender_Entity {
    constructor() {
        super("PLAYER");

        Object.assign(this, CONST.PLAYER);

        this.x = RENDERER.getCenter().x - this.width
        this.y = RENDERER.getCenter().y - this.height;

        this.vy = 0;
        this.vx = 0;


        this.images = {
            OFF: ASSETMANAGER.getAsset(this.ASSETS[0]),
            ON: ASSETMANAGER.getAsset(this.ASSETS[1]),
            PROJECTILE : ASSETMANAGER.getAsset(this.ASSETS[2])
        }

        this.image = this.images.OFF

        this.shots = MAX_SHOTS
        this.reloadDelay = 1;
        this.reloadTimer = 0.0;
        this.shotTimer = SHOT_DELAY;
        this.angleRad = 0;


    }

    update(dt) {

        super.update(dt);

        if (INPUT.isKeyDown(INPUT.KEYS.ArrowUp)) { //Add Acceleration
            this.image = this.images.ON

            let velocityInc = 10;
            this.angleRad = this.angle / 180 * Math.PI

            this.vx += Math.cos(this.angleRad) * ACCELERATION
            this.vy += Math.sin(this.angleRad) * ACCELERATION

            //TODO: Clamp max velocity
            if (this.vy < -MAX_VELOCITY) {
                this.vy = -MAX_VELOCITY
            }
            if (this.vx < -MAX_VELOCITY) {
                this.vx = -MAX_VELOCITY
            }
            if (this.vy > MAX_VELOCITY) {
                this.vy = MAX_VELOCITY
            }
            if (this.vx > MAX_VELOCITY) {
                this.vx = MAX_VELOCITY
            }



        } else {  //Slowdown
            this.image = this.images.OFF

            if (this.vy > 0) {
                this.vy -= FRICTION
            } else {
                this.vy += FRICTION
            }
            if (this.vx > 0) {
                this.vx -= FRICTION
            } else {
                this.vx += FRICTION
            }
        }

        if (INPUT.isKeyDown(INPUT.KEYS.ArrowRight)) {
            this.angle += 5;
        } else if (INPUT.isKeyDown(INPUT.KEYS.ArrowLeft)) {
            this.angle -= 5;
        }

        if (INPUT.isKeyDown(INPUT.KEYS.Space)) {
            if (this.shotTimer > SHOT_DELAY && this.shots > 0) {
                //if can shoot
                //let radius = this.width / 2
                
                let p = new Projectile(
                    this.x + this.width /2 - 16, 
                    this.y + this.height/2 - 16, 
                    this.angle)
                PLANET_DEFENDER_GAME.addProjectile(p)
                this.shots--
                this.shotTimer = 0.0
            }

        }

        this.shotTimer += dt
        this.reloadTimer += dt

        //reload every interval
        if (this.reloadTimer >= RELOAD_TIME && this.shots < MAX_SHOTS) {
            this.shots++
            this.reloadTimer = 0.0
        }

        this.x += this.vx * dt
        this.y += this.vy * dt
    }

    draw(){
        super.draw();

        for(let i = 0; i < this.shots; i++){
            RENDERER.drawImage(this.images.PROJECTILE, 10 + (i * 20), 10)
        }

    }

    projectileDrawTest(){
                //projectile draw test
        // let radius = this.width / 2
        // let originx = (this.x + this.width / 2 ) //- 16//+ this.width//+ (radius * Math.cos(this.angleRad))
        // let originy = (this.y + this.height/2 ) //- 16//+ this.height//+ (radius * Math.sin(this.angleRad))

        // let projx = originx + (radius * Math.cos(this.angleRad))//((originx + radius) - 16) + Math.cos(this.angleRad)
        // let projy = originy + (radius * Math.sin(this.angleRad)) //((originy - radius) - 16 ) * Math.sin(this.angleRad)

        // RENDERER.drawImage(this.images.PROJECTILE, projx, projy)

        // //RENDERER.StrokeRectangle(this.x, this.y, this.width, this.height)
        // RENDERER.StrokeCircle(originx, originy, this.width /2)
    }
}
