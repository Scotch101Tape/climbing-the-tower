import {Camera} from "./camera.js"
import {Vector} from "./vector.js"
import {Grid} from "./grid.js"
import {Entities, Spawn} from "./entities.js"
import {LevelBuffer} from "./level-buffer.js"
import {Map} from "./map.js"
import {Player} from "./player.js"
import {CANVAS_SIZE, FRAME_RATE} from "./config.js"
import {Effects} from "./effects.js"
import {Animation} from "./animation.js"

export let Scene = {}

Scene.init = function(window) {
    Scene.window = window
    Scene.changeScene(Scene.Scenes.Start)
}

Scene.changeScene = function(scene) {
    if (Scene.current != undefined) {
        for (const key in Scene.current) {
            if (key != "setup") {
                delete Scene.window[key]
            }
        }
    }

    Scene.current = scene

    for (const key in scene) {
        if (key == "setup") {
            scene.setup()
        } else {
            Scene.window[key] = scene[key]
        }
    }
}

Scene.Scenes = {}

// Starting scene
Scene.Scenes.Start = {}

Scene.Scenes.Start.draw = function() {
    textAlign(CENTER)
    background(0, 0, 0)

    fill(255, 255, 255)
    textSize(50)
    text("Climbing the Tower", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2)

    fill(200, 200, 200)
    textSize(20)
    text("click to start", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 + 60)
}

Scene.Scenes.Start.mouseClicked = function() {
    Scene.changeScene(Scene.Scenes.Game)
}

// Ending Scene
Scene.Scenes.End = {}

Scene.Scenes.End.draw = function() {
    textAlign(CENTER)
    background(0, 0, 0)

    fill(255, 255, 255)
    textSize(50)
    text("You climbed the tower", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2)

    fill(200, 200, 200)
    textSize(20)
    text("do you feel acomplished", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 + 60)
}

// Game scene
Scene.Scenes.Game = {}

Scene.Scenes.Game.draw = function() {
    // Apply background
    background(0, 0, 0)

    // Apply the camera
    push()
    if (Camera.initalized) {
        Camera.applyMatrix()
    }

    // Do map housekeeping
    if (Map.initalized) {
        Map.step(deltaTime)
        Map.draw()
        if (Map.checkKill(Player)) {
            Effects.death()
            Animation.clear()
            Map.reset()
        } else if (Map.checkPlayerFall(Player)) {
            Effects.death()
            Animation.clear()
            Map.reset()
        } else if (Map.checkFinish(Player)) {
            Effects.nextLevel()
            Animation.clear()
            const nextLevel = LevelBuffer.nextLevel()
            if (nextLevel == undefined) {
                Scene.changeScene(Scene.Scenes.End)
                return
            }
            Map.init(nextLevel)
        }
    }

    // Do player housekeeping
    if (Player.initalized) {
        Player.step(deltaTime)
        Player.move()
        Player.draw()
    }

    // Do animation housekeeping
    Animation.step()
    pop()

    // Directions
    fill(255, 255, 255)
    textSize(20)
    textAlign(LEFT)
    text("Press W to move toward the mouse\nPress SHIFT to dash\nSCROLL to zoom\nGet to the green\nTry not to die", 10, 20)
}

Scene.Scenes.Game.setup = function() {
    // Init the map, 
    // this inits map, camera, and player
    Map.init(LevelBuffer.nextLevel())
}

Scene.Scenes.Game.mouseWheel = function() {
    Camera.mouseWheel(event)
}