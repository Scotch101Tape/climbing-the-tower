import {Vector} from "./vector.js"
import {Grid} from "./grid.js"
import {Entities, Spawn} from "./entities.js"
import {Player} from "./player.js" 

/* Map */
export let Map = {
    center: Vector.nullVector(),
    initalized: false
    //level, grid, entities
}

Map.init = async function(level) {
    Map.level = await level

    Map.grid = new Grid(Map.level.grid)

    Map.entities = []
    for (const data of Map.level.entities) {
        const type = Entities[data.type]

        const entity = new type(data)
        entity.init(Map.grid)
        Map.entities.push(entity)

        // Handle special type cases
        switch (type) {
            case Spawn: {
                Player.init(entity.position)
            }
        }
    }
    
    Map.initalized = true
}

Map.draw = function() {
    Map.grid.draw()

    // Draw the entities
    for (const entity of Map.entities) {
        entity.draw(Map.center)
    }
}

Map.step = function(dt) {
    // Step the entities
    for (const entity of Map.entities) {
        entity.step(dt)
    }
}

Map.checkKill = function(player) {
    for (const entity of Map.entities) {
        if (entity.checkKill(player)) {
            return true
        }
    }
}