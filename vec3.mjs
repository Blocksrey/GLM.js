let sqrt = Math.sqrt

function Vec3(x, y, z) {
	this.x = x
	this.y = y
	this.z = z
}

let zero = new Vec3(0, 0, 0)

Vec3.zero = zero

Vec3.dot = b => {
	return this.x*b.x + this.y*b.y + this.z*b.z
}

Vec3.cross = b => {
	return new Vec3(
		this.y*b.z - this.z*b.y,
		this.z*b.x - this.x*b.z,
		this.x*b.y - this.y*b.x
	)
}

Vec3.square = () => {
	return this.x*this.x + this.y*this.y + this.z*this.z
}

//magnitude of vector
Vec3.norm = () => {
	return sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
}

//unitize assuming norm > 0
Vec3.posUnit = () => {
	let l = sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
	return new Vec3(this.x/l, this.y/l, this.z/l)
}

//unitize no assumptions
Vec3.unit = () => {
	let l = sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
	if (l > 0) {
		return new Vec3(this.x/l, this.y/l, this.z/l)
	}
	return zero
}

Vec3.dump = () => {
	return [this.x, this.y, this.z]
}

Vec3.quat = q => {
	let i, j, k = this.dump()
	let w, x, y, z = q.dumpH()

	return new Vec3(
		i*(1 - y*y - z*z) + j*(x*y - w*z) + k*(x*z + w*y),
		i*(x*y + w*z) + j*(1 - x*x - z*z) + k*(y*z - w*x),
		i*(x*z - w*y) + j*(y*z + w*x) + k*(1 - x*x - y*y)
	)
}

Vec3.invQuat = q => {
	let i, j, k = this.dump()
	let w, x, y, z = q.dumpH()

	return new Vec3(
		i*(1 - y*y - z*z) + j*(x*y + w*z) + k*(x*z - w*y),
		i*(x*y - w*z) + j*(1 - x*x - z*z) + k*(y*z + w*x),
		i*(x*z + w*y) + j*(y*z - w*x) + k*(1 - x*x - y*y)
	)
}

Vec3.prototype.add = b => {
	return new Vec3(
		this.x + b.x,
		this.y + b.y,
		this.z + b.z
	)
}

Vec3.prototype.sub = b => {
	return new Vec3(
		this.x - b.x,
		this.y - b.y,
		this.z - b.z
	)
}

Vec3.prototype.mul = b => {
	let atype = type(this)
	if (atype == "number") {
		return new Vec3(a*b.x, a*b.y, a*b.z)
	}
	else {
		return new Vec3(
			this.xx*b.x + this.yx*b.y + this.zx*b.z,
			this.xy*b.x + this.yy*b.y + this.zy*b.z,
			this.xz*b.x + this.yz*b.y + this.zz*b.z
		)
	}
}

Vec3.prototype.div = b => {
	return new Vec3(this.x/b, this.y/b, this.z/b)
}

Vec3.prototype.unm = () => {
	return new Vec3(-this.x, -this.y, -this.z)
}

Vec3.prototype.toString = () => {
	return "Vec3(" + this.x + ", " + this.y + ", " + this.z + ")"
}

export {Vec3}