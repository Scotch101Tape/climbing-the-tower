//TODO do animation

import {FRAME_RATE} from "./config.js"

export let Animation = {
    que: {}
}

Amimation.add = function(tween) {
    que[crypto.randomUUID()] = tween
}

Animation.step = function() {

}

Animation.Tween = function(start, end, frameNumber, f) {
    this.step = []
    for (const s of start) {
    }
}

Animation.Tween.prototype.play = function() {
    Animation.add(this)
}

Animation.Tween.prototype.next = function() {

}
