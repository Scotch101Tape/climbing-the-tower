/* Vector */
let Vector = function(x, y) {
	this.x = x
	this.y = y
}

Vector.nullVector = function() {
	return(new Vector(0,0))
} 

Vector.add = function(v1, v2) {
	let newVect = new Vector(v1.x + v2.x, v1.y + v2.y)
	return newVect
}

Vector.subtract = function(v1, v2) {
	let newVect = new Vector(v1.x - v2.x, v1.y - v2.y)
	return newVect
}

Vector.prototype.magnitude = function() {
	return(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)))
}

Vector.prototype.copy = function() {
  let newVect = new Vector(this.x, this.y)
  return newVect
}

Vector.prototype.unit = function() {
	let newVect = new Vector(this.x / this.magnitude(), this.y / this.magnitude())
	return newVect
}

Vector.prototype.scale = function(scaler) {
	let newVect = new Vector(this.x * scaler, this.y * scaler)
	return newVect
}

Vector.prototype.asArray = function() {
    return [this.x, this.y]
}

/* LevelBuffer */
let LevelBuffer = {
    level: 0,
    buffered: 0,
}

LevelBuffer.getLevel = function(number) {
    return (new Promise((res, rej) => {
        const Http = new XMLHttpRequest()
        const url=`https://climbing-the-tower-local.scotch101tape.repl.co/levels/${number}.json`
        Http.open("GET", url)
        Http.addEventListener("load", function() {
            res(this.responseText)
        })
        Http.send()
    }))
}

LevelBuffer.nextLevel = function() {
    LevelBuffer.level += 1
    for (;;) {

    }
}

/* Map */
let Map = {
    center: Vector.nullVector(),
    level: "something",
    data: "something else"
}

Map.init = function() {

}

Map.draw = function() {

}

Map.update = function() {

}

/* globals */
const CANVAS_SIZE = new Vector(400, 400)
const BACKGROUND = [0, 0, 0]

/* p5.js */
function setup() {
    createCanvas(...CANVAS_SIZE.asArray())
    Map.init(LevelBuffer.nextLevel())
}

function draw() {
    background(...BACKGROUND)
    Map.draw()
    Map.update()
}



