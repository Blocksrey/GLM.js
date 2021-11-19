let sqrt = Math.sqrt

function Vec2(x, y) {
	this.x = x
	this.y = y
}

let zero = new Vec2(0, 0)

Vec2.zero = zero

Vec2.prototype.nullify = () => {
	this.x = 0
	this.y = 0
}

Vec2.prototype.dot = b => {
	return this.x*b.x + this.y*b.y
}

Vec2.prototype.perp = () => {
	this.x = -this.y,
	this.y =  this.x
}

Vec2.prototype.square = () => {
	return this.x*this.x + this.y*this.y
}

Vec2.prototype.norm = () => {
	return sqrt(this.x*this.x + this.y*this.y)
}

Vec2.prototype.posUnit = () => {
	let norm = sqrt(this.x*this.x + this.y*this.y)
	this.x /= norm
	this.y /= norm
}

Vec2.prototype.unit = () => {
	let norm = sqrt(this.x*this.x + this.y*this.y)
	if (norm > 0) {
		this.x /= norm
		this.y /= norm
	}
}

Vec2.prototype.dump = () => {
	return [
		this.x,
		this.y
	]
}

Vec2.prototype.neg = () => {
	this.x = -this.x
	this.y = -this.y
}

Vec2.prototype.addNum = b => {
	this.x += b
	this.y += b
}

Vec2.prototype.subNum = b => {
	this.x -= b
	this.y -= b
}

Vec2.prototype.mulNum = b => {
	this.x *= b,
	this.y *= b
}

Vec2.prototype.divNum = b => {
	this.x /= b
	this.y /= b
}

Vec2.prototype.addVec = b => {
	this.x += b.x
	this.y += b.y
}

Vec2.prototype.subVec = b => {
	this.x -= b.x
	this.y -= b.y
}

Vec2.prototype.mulVec = b => {
	this.x *= b.x
	this.y *= b.y
}

Vec2.prototype.divVec = b => {
	this.x /= b.x
	this.y /= b.y
}

Vec2.prototype.mulMat = b => {
}

Vec2.prototype.mulMatTrans = b => {
	return this.mulMat2()
}

Vec2.prototype.mulMatInv = b => {
}

export {Vec2}