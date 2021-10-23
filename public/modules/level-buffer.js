/* LevelBuffer */
// Manage getting the levels from the server
export let LevelBuffer = {
    current: 1,
    buffered: 0,
    buffer: 3,
    levels: {}
}

// Get a level from the server
LevelBuffer.getLevel = function(number) {
    if (LevelBuffer.levels[number] != undefined) {
        // The level is already fetched, return it
        return LevelBuffer.LevelBuffer[number]
    } else {
        // Return a promise that get the level from the server
        return (new Promise((res, rej) => {
            const Http = new XMLHttpRequest()
            const url=`https://climbing-the-tower-local.scotch101tape.repl.co/levels/${number}.json`
            Http.open("GET", url)
            Http.addEventListener("load", function() {
                if (this.status == 200) {
                    res(JSON.parse(this.responseText))
                } else {
                    rej("Level json file does not exist")
                }
            })

            Http.send()
        }))
    }
}

// Get the next level
LevelBuffer.nextLevel = function() {
    // Get rid of the previous level
    delete LevelBuffer.levels[LevelBuffer.current]

    // Update the buffer
    LevelBuffer.current += 1
    for (LevelBuffer.buffered++; LevelBuffer.buffered <= LevelBuffer.current + LevelBuffer.buffer; LevelBuffer.buffered++) {
        LevelBuffer.levels[LevelBuffer.buffered] = LevelBuffer.getLevel(LevelBuffer.buffered)
    }

    // Return the level promise
    return LevelBuffer.levels[LevelBuffer.current]
}