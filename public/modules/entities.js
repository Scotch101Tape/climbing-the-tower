import {Vector} from "./vector.js"

/* Entity */
export let Entity = function(data) {
    this.position = Vector.fromArray(data.position)
}

Entity.prototype.init = function(grid) {}
Entity.prototype.step = function(dt) {}
Entity.prototype.draw = function() {}
Entity.prototype.checkKill = function(player) {
    return false
}

/* Spawn */
export let Spawn = function(data) {
    Entity.call(this, data)
}

Spawn.prototype = Object.create(Entity.prototype)

Spawn.prototype.draw = function() {
    fill(0, 0, 255)
    ellipse(this.position.x, this.position.y, 0.9, .9)
}

/* Finish */
export let Finish = function(data) {
    Entity.call(this, data)
}

Finish.prototype = Object.create(Entity.prototype)

Finish.prototype.draw = function() {
    fill(0, 255, 0)
    rect(this.position.x, this.position.y, 1, 1)
}

/* Spike */ 
export let Spike = function(data) {
    Entity.call(this, data)

    // Spike are up when the time is greater than the interval
    // The time is moded around interval * 2
    // This results in the spikes being up for an interval, down for an interval
    this.interval = data.interval
    this.time = data.startTime
}

Spike.prototype = Object.create(Entity.prototype)

Spike.prototype.spikey = function() {
    return this.time > this.interval
}

Spike.prototype.step = function(dt) {
    this.time = (this.time + dt) % (this.interval * 2)
}

Spike.prototype.draw = function() {
    if (this.spikey()) {
        fill(255, 0, 0)
    } else {
        fill(200, 200, 200)
    }
    rect(this.position.x, this.position.y, 0.75, 0.75)
}

Spike.prototype.checkKill = function(player) {
    if (this.spikey()) {
        return player.isOnRectangle(this.position.x, this.position.y, 0.75, 0.75)
    }
}

/* Lava */
export let Lava = function(data) {
    Entity.call(this, data)
}

Lava.prototype = Object.create(Entity.prototype)

Lava.prototype.draw = function() {
    fill(255, 0, 0)
    rect(this.position.x, this.position.y, 0.75, 0.75)
}

Lava.prototype.checkKill = function(player) {
    return player.isOnRectangle(this.position.x, this.position.y, 0.75, 0.75)
}

/* Entities */
export let Entities = {
    "spawn": Spawn,
    "finish": Finish,
    "spike": Spike,
    "lava": Lava
}