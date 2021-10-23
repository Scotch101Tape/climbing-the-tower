import {Camera} from "./camera.js"
import {CANVAS_SIZE} from "./config.js"
import {Vector} from "./vector.js"

/* Player */
export let Player = {
    initalized: false,
    SIZE: 0.5,
    SPEED: 0.1,
    CONTROLS: {
        MOVE: 87
    }
}

Player.init = function(position) {
    Player.position = position
    Player.initalized = true

    Camera.init(Player.position)
}

Player.draw = function() {
    fill(255, 255, 255)

    ellipse(Player.position.x, Player.position.y, Player.SIZE, Player.SIZE)
}

Player.move = function(map) {
    //TODO fix this

    // Move toward the mouse if the w key is down
    if (keyIsDown(Player.CONTROLS.MOVE)) {        
        const mousePosition = Camera.pixelToPosition(new Vector(mouseX, mouseY))
        const direction = Vector.subtract(mousePosition, Player.position)
        let newPosition
        if (direction.magnitude() < Player.SPEED) {
            newPosition = Vector.add(Player.position, direction)
        } else {
            newPosition = Vector.add(Player.position, direction.unit().scale(Player.SPEED))
        }

        if (true || map.grid.playerIsOn(Player)) {
            Player.position = newPosition
            Camera.playerPositionChanged(Player.position)
        }
    }
}

// return true if the player is inside the specified rectange
Player.isInRectangle = function(x, y, w, h) {
    //TODO check if player is in a rectange
    return false
}