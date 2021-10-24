import {FRAME_RATE} from "./config.js"

export let Animation = {
    que: {}
}

Animation.NextValue = {
    Continue: 0,
    End: 1
}

Animation.add = function(tween) {
    Animation.que[crypto.randomUUID()] = tween
}

Animation.step = function() {
    for (const key in Animation.que) {
        if (Animation.que[key].next() == Animation.NextValue.End) {
            Animation.que[key].finish()
            delete Animation.que[key]
        }
    }
}

Animation.clear = function() {
    Animation.que = {}
}

Animation.Tween = function(start, end, frameNumber, f) {
    const difs = []
    for (let i = 0; i < start.length; i++) {
        difs.push(end[i] - start[i])
    }

    this.start = start
    this.step = difs.map(dif => {
        return dif / frameNumber
    })

    this.f = f
    this.frameNumber = frameNumber
    this.frame = 0
}

Animation.Tween.prototype.play = function() {
    Animation.add(this)

    const This = this
    return new Promise((res, rej) => {
        This.resolve = res
    })
}

Animation.Tween.prototype.finish = function() {
    this.resolve()
}

Animation.Tween.prototype.next = function() {
    this.frame++

    this.f(Array.from(this.step
        .entries())
        .map(([i, val]) => val * this.frame + this.start[i])
    )

    if (this.frame == this.frameNumber) {
        return Animation.NextValue.End
    } else {
        return Animation.NextValue.Continue
    }
}
