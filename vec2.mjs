let sqrt = Math.sqrt

function Vec2(x, y) {
	this.x = x
	this.y = y
}

let zero = new Vec2(0, 0)

Vec2.zero = zero

Vec2.prototype.dot = b => {
	return this.x*b.x + this.y*b.y
}

Vec2.prototype.perp = () => {
	return new Vec2(this.x, -this.y)
}

Vec2.prototype.square = () => {
	return this.x*this.x + this.y*this.y
}

Vec2.prototype.norm = () => {
	return sqrt(this.x*this.x + this.y*this.y)
}

Vec2.prototype.posUnit = () => {
	let l = sqrt(this.x*this.x + this.y*this.y)
	return new Vec2(this.x/l, this.y/l)
}

Vec2.prototype.unit = () => {
	let l = sqrt(this.x*this.x + this.y*this.y)
	if (l > 0) {
		return new Vec2(this.x/l, this.y/l)
	}
	return zero
}

Vec2.prototype.dump = () => {
	return [this.x, this.y]
}

Vec2.prototype.add = b => {
	return new Vec2(
		this.x + b.x,
		this.y + b.y
	)
}

Vec2.prototype.sub = b => {
	return new Vec2(
		this.x - b.x,
		this.y - b.y
	)
}

Vec2.prototype.mul = b => {
	let atype = type(this)
	if (atype == "number") {
		return new Vec2(a*b.x, a*b.y)
	}
	else {
		return new Vec2(
			this.xx*b.x + this.yx*b.y,
			this.xy*b.x + this.yy*b.y
		)
	}
}

Vec2.prototype.div = b => {
	return new Vec2(this.x/b, this.y/b)
}

Vec2.prototype.unm = () => {
	return new Vec2(-this.x, -this.y)
}

Vec2.prototype.toString = () => {
	return "Vec2(" + this.x + ", " + this.y + ")"
}

export {Vec2}