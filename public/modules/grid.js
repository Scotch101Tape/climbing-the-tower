/* Grid */
export let Grid = function(data) {
    this.data = data
}

Grid.prototype.filled = function(v) {
    if (this.data[v.x] != undefined) {
        if (this.data[v.x][v.y] != undefined) {
            return true
        }
    }

    return false
}

Grid.prototype.foreachCell = function(f) {
    for (const x in this.data) {
        for (const y in this.data[x]) {
            // If there is a result, return it and break the loop
            const result = f(Number(x), Number(y))
            if (result != undefined) {
                return result
            }
        }
    }
}

Grid.prototype.draw = function() {
    this.foreachCell((x, y) => {
        fill(150, 150, 150)
        rect(x, y, 1, 1)
    })
}

Grid.positionToCell = function(v) {
    return new Vector(Math.round(v.x), Math.round(v.y))
}

Grid.prototype.raycast = function(origin, direction) {
    // TODO

    const step = direction.scale(Math.min(1/direction.x, 1/direction.y))

    const stepMag = step.magnitude()
    const directionMag = direction.magnitude()

    for (let i = 0; stepMag * i < range; i++) {
        const cell = Grid.positionToCell(Vector.add(step.scale(i), origin))
        if (this.filled(cell)) {
            return 
        }
    }

    return undefined
}

Grid.nextLine = function(origin, direction) {

}

Grid.prototype.positionIsOn = function (position) {
    const px = position.x
    const py = position.y
    if(this.foreachCell((x, y) => {
        if (px >= x - 0.5
            && py >= y - 0.5
            && px <= x + 0.5
            && py <= y + 0.5) {
            return true
        }
    }) != undefined) {
        return true
    } else {
        return false
    }
}