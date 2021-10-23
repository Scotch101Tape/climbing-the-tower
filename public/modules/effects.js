import {CANVAS_SIZE} from "./config.js"

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

Effects.dash = function() {
    Effects.dashSound.play()
}

Effects.nextLevel = function() {
    fill(255, 255, 255, 100)
    rect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y)

    Effects.nextLevelSound.play()

    setTimeout(() => {
        loop()
    }, 3000)
    noLoop()
}