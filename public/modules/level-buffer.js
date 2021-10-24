/* LevelBuffer */
// Manage getting the levels from the server
export let LevelBuffer = {
    current: 0,
    buffered: 0,
    MAX: 4,
    buffer: 3,
    levels: {}
}

// Get a level from the server
LevelBuffer.getLevel = function(number) {
    // Dont grab a level above the max
    if (number > LevelBuffer.MAX) {
        return
    }

    if (LevelBuffer.levels[number] != undefined) {
        // The level is already fetched, return it
        return LevelBuffer.LevelBuffer[number]
    } else {
        // Return a promise that get the level from the server
        return new Promise((res, rej) => {
            fetch(`https://climbing-the-tower-local.scotch101tape.repl.co/levels/${number}.json`)
            .then(response => response.json())
            .then(data => res(data))
        })
    }
}

// Get the next level
LevelBuffer.nextLevel = function() {
    // Get rid of the previous level
    delete LevelBuffer.levels[LevelBuffer.current]

    // Update the buffer
    LevelBuffer.current += 1
    if (LevelBuffer.current > LevelBuffer.MAX) {
        return undefined
    }
    for (LevelBuffer.buffered++; LevelBuffer.buffered <= Math.min(LevelBuffer.current + LevelBuffer.buffer, LevelBuffer.MAX); LevelBuffer.buffered++) {
        LevelBuffer.levels[LevelBuffer.buffered] = LevelBuffer.getLevel(LevelBuffer.buffered)
    }

    // Return the level promise
    return LevelBuffer.levels[LevelBuffer.current]
}