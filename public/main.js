import {Camera} from "./modules/camera.js"
import {Vector} from "./modules/vector.js"
import {Grid} from "./modules/grid.js"
import {Entities, Spawn} from "./modules/entities.js"
import {LevelBuffer} from "./modules/level-buffer.js"
import {Map} from "./modules/map.js"
import {Player} from "./modules/player.js"
import {CANVAS_SIZE, FRAME_RATE} from "./modules/config.js"
import {Effects} from "./modules/effects.js"
import {Animation} from "./modules/animation.js"
import {Scene} from "./modules/scene.js"

/* p5.js */
window.preload = function() {
    //Init effects
    Effects.init()
}

window.setup = function() {
    noStroke()
    frameRate(FRAME_RATE)
    rectMode(CENTER)
    textAlign(CENTER)
    createCanvas(...CANVAS_SIZE.asArray())
}

Scene.init(window)