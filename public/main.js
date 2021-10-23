import {Camera} from "./modules/camera.js"
import {Vector} from "./modules/vector.js"
import {Grid} from "./modules/grid.js"
import {Entities, Spawn} from "./modules/entities.js"
import {LevelBuffer} from "./modules/level-buffer.js"
import {Map} from "./modules/map.js"
import {Player} from "./modules/player.js"
import {CANVAS_SIZE, BACKGROUND, FRAME_RATE} from "./modules/config.js"
import {Effects} from "./modules/effects.js"

/* p5.js */
window.preload = function() {
    //Init effects
    Effects.init()
}

window.setup = function() {
    textSize(20)
    noStroke()
    frameRate(FRAME_RATE)
    rectMode(CENTER)
    createCanvas(...CANVAS_SIZE.asArray())

    // Init the map, 
    // this inits map, camera, and player
    Map.init(LevelBuffer.nextLevel())
}

window.draw = function() {
    // Apply background
    background(...BACKGROUND)

    // Directions
    fill(255, 255, 255)
    text("Press W to move in toward the mouse\nPress left shift to dash", 10, 15)

    // Apply the camera
    if (Camera.initalized) {
        Camera.applyMatrix()
    }

    // Do map housekeeping
    if (Map.initalized) {
        Map.step(deltaTime)
        Map.draw()
        if (Map.checkKill(Player)) {
            Effects.death()
            Map.reset()
        } else if (Map.checkPlayerFall(Player)) {
            Effects.death()
            Map.reset()
        } else if (Map.checkFinish(Player)) {
            Effects.nextLevel()
            Map.init(LevelBuffer.nextLevel())
        }
    }

    // Do player housekeeping
    if (Player.initalized) {
        Player.step(deltaTime)
        Player.move()
        Player.draw()
    }
}

// Do scaling with the mouse wheel
window.mouseWheel = function(event) {
    Camera.mouseWheel(event)
}
