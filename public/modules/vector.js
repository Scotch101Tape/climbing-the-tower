/* Vector */
export let Vector = function(x, y) {
	this.x = x
	this.y = y
}

Vector.fromArray = function(a) {
    return new Vector(a[0], a[1])
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

Vector.prototype.signs = function() {
    let newVect = new Vector(Math.sign(this.x), Math.sign(this.y))
    return newVect
}