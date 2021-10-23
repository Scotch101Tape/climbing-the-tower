import {CANVAS_SIZE} from "./config.js" 
import {Vector} from "./vector.js"

/* Camera */
export let Camera = {
    initalized: false,
    scale: 50.0,
}

Camera.init = function(position) {
    Camera.position = position
    Camera.initalized = true
}

Camera.applyMatrix = function() {
    translate(...CANVAS_SIZE.scale(1/2).asArray())
    scale(Camera.scale)
    translate(...Camera.position.scale(-1).asArray())
}

Camera.mouseWheel = function(event) {
    Camera.scale = Math.max(Math.min(Camera.scale - event.delta * 0.1 , 100), 10)
}

Camera.playerPositionChanged = function(position) {
    Camera.position = position
}

Camera.pixelToPosition = function(pixel) {
    const trans1 = Vector.subtract(pixel, CANVAS_SIZE.scale(1/2))
    const trans2 = trans1.scale(1 / Camera.scale)
    const trans3 = Vector.add(trans2, Camera.position)

    return trans3
}