function Mat2(
	xx, yx,
	xy, yy
) {
	this.xx = xx
	this.yx = yx

	this.xy = xy
	this.yy = yy
}

Mat2.identity = new Mat2(1, 0, 0, 1)

Mat2.prototype.inv = () => {
	let [xx, yx, xy, yy] = this.dump()

	let det = xx*yy - xy*yx

	this.xx =  yy/det
	this.yx = -yx/det

	this.xy = -xy/det
	this.yy =  xx/det

}

Mat2.prototype.trans = () => {
	let [xx, yx, xy, yy] = this.dump()

	this.xx = xx
	this.yx = xy

	this.xy = yx
	this.yy = yy
}

Mat2.prototype.det = () => {
	return xx*yy - xy*yx
}

Mat2.prototype.trace = () => {
	return this.xx + this.yy
}

Mat2.prototype.dump = () => {
	return [
		this.xx,
		this.yx,

		this.xy,
		this.yy
	]
}

Mat2.prototype.add = b => {
	this.xx += b.xx
	this.yx += b.yx

	this.xy += b.xy
	this.yy += b.yy
}

Mat2.prototype.sub = b => {
	this.xx -= b.xx
	this.yx -= b.yx

	this.xy -= b.xy
	this.yy -= b.yy
}

Mat2.prototype.mul = b => {
	this.xx *= b.xx
	this.yx *= b.yx

	this.xy *= b.xy
	this.yy *= b.yy
}

Mat2.prototype.div = b => {
	this.xx /= b
	this.yx /= b

	this.xy /= b
	this.yy /= b
}

Mat2.prototype.unm = () => {
	this.xx = -this.xx
	this.yx = -this.yx

	this.xy = -this.xy
	this.yy = -this.yy
}

let cos = Math.cos
let sin = Math.sin

Mat2.angles = t => {
	let c = cos(t)
	let s = sin(t)

	return new Mat2(
		c, -s,
		s, c
	)
}

export {Mat2}