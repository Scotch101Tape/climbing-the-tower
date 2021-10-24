import {CANVAS_SIZE} from "./config.js"
import {Animation} from "./animation.js"
import {Player} from "./player.js"
import {Camera} from "./camera.js"
import {Vector} from "./vector.js"

export let Effects = {}

Effects.init = function() {
    soundFormats("mp3")
    Effects.deathSound = loadSound("../assets/death.mp3")
    Effects.dashSound = loadSound("../assets/dash.mp3")
    Effects.nextLevelSound = loadSound("../assets/nextLevel.mp3") 
}

Effects.death = function() {
    fill(255, 0, 0, 100)
    rect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y)
    Effects.deathSound.play()
    
    // Stop looping for a half a second
    setTimeout(() => {
        loop()
    }, 500)
    noLoop()
}

Effects.dash = function(start, end) {
    Player.animate()
    const tween = new Animation.Tween([start.x, start.y], [end.x, end.y], 10, (val) => {
        Player.position = new Vector(val[0], val[1])
        Camera.playerPositionChanged(Player.position)
    })
    tween.play().then(() => {
        Player.stopAnimating()
    })

    Effects.dashSound.play()
}

Effects.nextLevel = function() {
    fill(255, 255, 255, 100)
    rect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y)

    Effects.nextLevelSound.play()

    // stop looping for 3 seconds
    setTimeout(() => {
        loop()
    }, 3000)
    noLoop()
}