import {Camera} from "./camera.js"
import {CANVAS_SIZE} from "./config.js"
import {Vector} from "./vector.js"
import {Effects} from "./effects.js"

/* Player */
export let Player = {
    initalized: false,
    dashCooldown: 0,
    SIZE: 0.5,
    SPEED: 0.1,
    DASH_DISTANCE: 2,
    CONTROLS: {
        MOVE: 87,
        DASH: 16
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

Player.step = function(dt) {
    Player.dashCooldown = Math.max(Player.dashCooldown - dt, 0 - Number.EPSILON)
}

Player.move = function() {
    // Move toward the mouse if the w key is down
    if (keyIsDown(Player.CONTROLS.MOVE)) {        
        const mousePosition = Camera.pixelToPosition(new Vector(mouseX, mouseY))
        const direction = Vector.subtract(mousePosition, Player.position)

        // Go lower speeds if closer
        Player.position = direction.magnitude() < Player.SPEED
            ? Vector.add(Player.position, direction)
            : Vector.add(Player.position, direction.unit().scale(Player.SPEED))
        
    } else if (keyIsDown(Player.CONTROLS.DASH) && Player.dashCooldown <= 0) {
        const mousePosition = Camera.pixelToPosition(new Vector(mouseX, mouseY))
        const direction = Vector.subtract(mousePosition, Player.position)

        Player.position = Vector.add(direction.unit().scale(Player.DASH_DISTANCE), Player.position)

        Player.dashCooldown = 1000

        Effects.dash()
    } else {
        return
    }

    Camera.playerPositionChanged(Player.position)
}

// return true if the player is inside the specified rectange
Player.isOnRectangle = function(x, y, w, h) {
    // check that the circle center is not in the rectange
    const px = Player.position.x
    const py = Player.position.y
    if (px >= x - w / 2
        && py >= y - h /2
        && px <= x + w / 2
        && py <= y + h / 2
    ) {
        return true
    }

    // get the rectangle position vector
    const rp = new Vector(x, y)

    // get the distance from the center of the circle to rectange
    const vectorFromCenter = Vector.subtract(Player.position, rp)
    const dx = vectorFromCenter.x
    const dy = vectorFromCenter.y

    // closest points

    let cx = Math.min(Math.max(dx + x, x - w / 2), x + w / 2)
    let cy = Math.min(Math.max(dy + y, y - h / 2), y + h / 2)

    // check if cx, cy is less than a radius from the player center
    const distanceFromRectangle = Vector.subtract(new Vector(cx, cy), Player.position).magnitude()
    return distanceFromRectangle <= Player.SIZE / 2
}