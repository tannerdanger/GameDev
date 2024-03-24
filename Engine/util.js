export default class Utilities {
    constructor() {
        this.UUID_MANAGER = new UUID_MANAGER();
    }

    /**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {Number} A number between the min and the max, including the min and exlcuding the max
 */
    GetRandomInt(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

}



class UUID_MANAGER {
    constructor() {
        this.type = "TYPE"
        this.name = "NAME"
        this.unique = ""
    }


    createUUID() {
        this.unique = Date.now().toString(36) + Math.random().toString(36).substring(2);
        return this
    }

    withName(name) {
        this.name = name || "NAME"
        return this
    }

    withType(type) {
        this.type = type || "TYPE"
        return this
    }

    build() {
        let id = new UUID(this.type, this.name, this.unique)
        this.type = "TYPE"
        this.name = "NAME"
        this.unique = ""
        return id;
    }

}

class UUID {
    constructor(type, name, unique) {
        this.type = type
        this.name = name
        this.unique = unique
    }

    toString() {
        return this.type + "::" + this.name + "::" + this.unique
    }
}