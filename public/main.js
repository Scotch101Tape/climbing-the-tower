import {Camera} from "./modules/camera.js"
import {Vector} from "./modules/vector.js"
import {Grid} from "./modules/grid.js"
import {Entities, Spawn} from "./modules/entities.js"
import {LevelBuffer} from "./modules/level-buffer.js"
import {Map} from "./modules/map.js"
import {Player} from "./modules/player.js"
import {CANVAS_SIZE, BACKGROUND, FRAME_RATE} from "./modules/config.js"

/* p5.js */
window.setup = function() {
    noStroke()
    frameRate(FRAME_RATE)
    rectMode(CENTER)
    createCanvas(...CANVAS_SIZE.asArray())
    Map.init(LevelBuffer.nextLevel())
}

window.draw = function() {
    // Apply background
    background(...BACKGROUND)

    // Apply the camera
    if (Camera.initalized) {
        Camera.applyMatrix()
    }

    if (Map.initalized) {
        Map.draw()
        Map.step(deltaTime)
        if (Map.checkKill(Player)) {
            // TODO do the dying thing
            console.log("PLAYER HAS DIED")
        }
    }

    if (Player.initalized) {
        Player.draw()
        Player.move(Map)
    }
}

window.mouseWheel = function(event) {
    Camera.mouseWheel(event)
    console.log(Camera.scale)
}
