let sqrt = Math.sqrt

function Vec4(x, y, z, w) {
	this.x = x
	this.y = y
	this.z = z
	this.w = w
}

let zero = new Vec4(0, 0, 0, 0)

Vec4.zero = zero

Vec4.dot = b => {
	return this.x*b.x + this.y*b.y + this.z*b.z + this.w*b.w
}

Vec4.prototype.cross = (b, c) => {
	let [ax, ay, az, aw] = this.dump()
	let [bx, by, bz, bw] = b.dump()
	let [cx, cy, cz, cw] = c.dump()

	return new Vec4(
		ay*bz*cw + az*bw*cy - aw*bz*cy - ay*bw*cz + aw*by*cz - az*by*cw,
		az*bx*cw - ax*bz*cw - az*bw*cx + aw*bz*cx + ax*bw*cz - aw*bx*cz,
		ax*by*cw + ay*bw*cx - aw*by*cx - ax*bw*cy + aw*bx*cy - ay*bx*cw,
		az*by*cx - ay*bz*cx - az*bx*cy + ax*bz*cy + ay*bx*cz - ax*by*cz,
	)
}

Vec4.square = () => {
	return this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w
}

Vec4.norm = () => {
	return sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w)
}

Vec4.posUnit = () => {
	let l = sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w)
	return new Vec4(this.x/l, this.y/l, this.z/l, this.w/l)
}

Vec4.unit = () => {
	let l = sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w)
	if (l > 0) {
		return new Vec4(this.x/l, this.y/l, this.z/l, this.w/l)
	}
	return zero
}

Vec4.dump = () => {
	return [this.x, this.y, this.z, this.w]
}

Vec4.prototype.add = b => {
	return new Vec4(
		this.x + b.x,
		this.y + b.y,
		this.z + b.z,
		this.w + b.w
	)
}

Vec4.prototype.sub = b => {
	return new Vec4(
		this.x - b.x,
		this.y - b.y,
		this.z - b.z,
		this.w - b.w
	)
}

Vec4.prototype.mul = b => {
	let atype = type(this)
	if (atype == 'number') {
		return new Vec4(a*b.x, a*b.y, a*b.z, a*b.w)
	}
	else {
		return new Vec4(
			this.xx*b.x + this.yx*b.y + this.zx*b.z + this.wx*b.w,
			this.xy*b.x + this.yy*b.y + this.zy*b.z + this.wy*b.w,
			this.xz*b.x + this.yz*b.y + this.zz*b.z + this.wz*b.w,
			this.xw*b.x + this.yw*b.y + this.zw*b.z + this.ww*b.w
		)
	}
}

Vec4.prototype.div = b => {
	return new Vec4(this.x/b, this.y/b, this.z/b, this.w/b)
}

Vec4.prototype.unm = () => {
	return new Vec4(-this.x, -this.y, -this.z, -this.w)
}

Vec4.prototype.toString = () => {
	return 'Vec4(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')'
}

export {Vec4}