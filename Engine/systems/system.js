import { UTIL } from "../engine.js";
//TODO: Create system messages that alert listeners for system changes;

export default class System {
    constructor(name){
        name = name || "SYS_NOT_NAMED"
        this.uuid = UTIL.UUID_MANAGER.createUUID().withName(name).withType("SYSTEM").build();
        this.isDebug = false;
    }

    init(){}

    checkInit(){
        return true
    }

    getID(){
        return String("SYSTEM::"+this._name)
    }

    runTest(){
        console.log(this.getID() + " System Test Complete")
    }
}

