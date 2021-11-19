function Mat4(
	xx, yx, zx, wx,
	xy, yy, zy, wy,
	xz, yz, zz, wz,
	xw, yw, zw, ww
) {
	this.xx = xx
	this.yx = yx
	this.zx = zx
	this.wx = wx

	this.xy = xy
	this.yy = yy
	this.zy = zy
	this.wy = wy

	this.xz = xz
	this.yz = yz
	this.zz = zz
	this.wz = wz

	this.xw = xw
	this.yw = yw
	this.zw = zw
	this.ww = ww
}

Mat4.identity = new Mat4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
)

Mat4.prototype.dump = function() {
	return [
		this.xx,
		this.yx,
		this.zx,
		this.wx,

		this.xy,
		this.yy,
		this.zy,
		this.wy,

		this.xz,
		this.yz,
		this.zz,
		this.wz,

		this.xw,
		this.yw,
		this.zw,
		this.ww
	]
}

Mat4.prototype.dumpT = function() {
	return [
		this.xx,
		this.xy,
		this.xz,
		this.xw,

		this.yx,
		this.yy,
		this.yz,
		this.yw,

		this.zx,
		this.zy,
		this.zz,
		this.zw,

		this.wx,
		this.wy,
		this.wz,
		this.ww
	]
}

Mat4.prototype.add = function(b) {
	return new Mat4(
		this.xx += b.xx,
		this.yx += b.yx,
		this.zx += b.zx,
		this.wx += b.wx,

		this.xy += b.xy,
		this.yy += b.yy,
		this.zy += b.zy,
		this.wy += b.wy,

		this.xz += b.xz,
		this.yz += b.yz,
		this.zz += b.zz,
		this.wz += b.wz,

		this.xw += b.xw,
		this.yw += b.yw,
		this.zw += b.zw,
		this.ww += b.ww
	)
}

Mat4.prototype.mul = function(b) {
	return new Mat4(
		this.wx*b.xw + this.xx*b.xx + this.yx*b.xy + this.zx*b.xz,
		this.wx*b.yw + this.xx*b.yx + this.yx*b.yy + this.zx*b.yz,
		this.wx*b.zw + this.xx*b.zx + this.yx*b.zy + this.zx*b.zz,
		this.wx*b.ww + this.xx*b.wx + this.yx*b.wy + this.zx*b.wz,

		this.wy*b.xw + this.xy*b.xx + this.yy*b.xy + this.zy*b.xz,
		this.wy*b.yw + this.xy*b.yx + this.yy*b.yy + this.zy*b.yz,
		this.wy*b.zw + this.xy*b.zx + this.yy*b.zy + this.zy*b.zz,
		this.wy*b.ww + this.xy*b.wx + this.yy*b.wy + this.zy*b.wz,

		this.wz*b.xw + this.xz*b.xx + this.yz*b.xy + this.zz*b.xz,
		this.wz*b.yw + this.xz*b.yx + this.yz*b.yy + this.zz*b.yz,
		this.wz*b.zw + this.xz*b.zx + this.yz*b.zy + this.zz*b.zz,
		this.wz*b.ww + this.xz*b.wx + this.yz*b.wy + this.zz*b.wz,

		this.ww*b.xw + this.xw*b.xx + this.yw*b.xy + this.zw*b.xz,
		this.ww*b.yw + this.xw*b.yx + this.yw*b.yy + this.zw*b.yz,
		this.ww*b.zw + this.xw*b.zx + this.yw*b.zy + this.zw*b.zz,
		this.ww*b.ww + this.xw*b.wx + this.yw*b.wy + this.zw*b.wz
	)
}

Mat4.prototype.trans = function() {
	return new Mat4(
		this.xx, this.xy, this.xz, this.xw,
		this.yx, this.yy, this.yz, this.yw,
		this.zx, this.zy, this.zz, this.zw,
		this.wx, this.wy, this.wz, this.ww
	)
}

Mat4.translation = function(x, y, z) {
	return new Mat4(
		1, 0, 0, x,
		0, 1, 0, y,
		0, 0, 1, z,
		0, 0, 0, 1
	)
}

Mat4.scale = function(x, y, z) {
	return new Mat4(
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1
	)
}

let cos = Math.cos
let sin = Math.sin

Mat4.rotate_x = function(t) {
	let c = cos(t)
	let s = sin(t)

	return new Mat4(
		1, 0,  0, 0,
		0, c, -s, 0,
		0, s,  c, 0,
		0, 0,  0, 1
	)
}

Mat4.rotate_y = function(t) {
	let c = cos(t)
	let s = sin(t)

	return new Mat4(
		 c, 0, s, 0,
		 0, 1, 0, 0,
		-s, 0, c, 0,
		 0, 0, 0, 1
	)
}

Mat4.rotate_z = function(t) {
	let c = cos(t)
	let s = sin(t)

	return new Mat4(
		c, -s, 0, 0,
		s,  c, 0, 0,
		0,  0, 1, 0,
		0,  0, 0, 1
	)
}

Mat4.perspective = function() {
	let f = 100
	let n = 1

	let r = 0.5
	let t = 0.5

	return new Mat4(
		n/r, 0, 0, 0,
		0, n/t, 0, 0,
		0, 0, (n + f)/(n - f), 2*n*f/(n - f),
		0, 0, -1, 0
	)
}

export {Mat4}