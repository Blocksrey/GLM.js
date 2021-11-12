let sqrt = Math.sqrt
let cos = Math.cos
let sin = Math.sin
let acos = Math.acos
let log = Math.log
let rand = Math.random

function Quat(x, y, z, w) {
	this.x = x
	this.y = y
	this.z = z
	this.w = w
}

let hyp = 1.41421356237
let tau = 6.28318530718

Quat.identity = new Quat(0, 0, 0, 1)

Quat.prototype.inv = () => {
	return new Quat(-this.x, -this.y, -this.z, this.w)
}

Quat.prototype.slerp = (b, n) => {
	let ax, ay, az, aw = this.dump()
	let bx, by, bz, bw = b.dump()

	if (ax*bx + ay*by + az*bz + aw*bw < 0) {
		ax = -ax
		ay = -ay
		az = -az
		aw = -aw
	}

	let x = aw*bx - ax*bw + ay*bz - az*by
	let y = aw*by - ax*bz - ay*bw + az*bx
	let z = aw*bz + ax*by - ay*bx - az*bw
	let w = aw*bw + ax*bx + ay*by + az*bz

	let t = n*acos(w)
	let s = sin(t)/sqrt(x*x + y*y + z*z)

	bx = s*x
	by = s*y
	bz = s*z
	bw = cos(t)

	return new Quat(
		aw*bx + ax*bw - ay*bz + az*by,
		aw*by + ax*bz + ay*bw - az*bx,
		aw*bz - ax*by + ay*bx + az*bw,
		aw*bw - ax*bx - ay*by - az*bz
	)
}

Quat.eulerAnglesX2 = t => {//real theta = 2*t
	return new Quat(0, sin(t), 0, cos(t))
}

Quat.eulerAnglesY2 = t => {//real theta = 2*t
	return new Quat(0, 0, sin(t), cos(t))
}

Quat.eulerAnglesZ2 = t => {//real theta = 2*t
	return new Quat(sin(t), 0, 0, cos(t))
}

Quat.mat = m => {
	let [xx, yx, zx, xy, yy, zy, xz, yz, zz] = m.dump()
	if (xx + yy + zz > 0) {
		let s = 0.5/sqrt(1 + xx + yy + zz)
		return new Quat(s*(xy - yx), s*(yz - zy), s*(zx - xz), 0.25/s)
	}
	else if (xx > yy && xx > zz) {
		let s = 0.5/sqrt(1 + xx - yy - zz)
		return new Quat(s*(zx + xz), 0.25/s, s*(yx + xy), s*(yz - zy))
	}
	else if (yy > zz) {
		let s = 0.5/sqrt(1 - xx + yy - zz)
		return new Quat(s*(zy + yz), s*(yx + xy), 0.25/s, s*(zx - xz))
	}
	else {
		let s = 0.5/sqrt(1 - xx - yy + zz)
		return new Quat(0.25/s, s*(zx + xz), s*(zy + yz), s*(xy - yx))
	}
}

Quat.look = b => {
	let [ax, ay, az] = this.dump()
	let [bx, by, bz] = b.dump()
	return new Quat(
		DIA*(ay*bz - az*by),
		DIA*(az*bx - ax*bz),
		DIA*(ax*by - ay*bz),
		DIA
	)
}

Quat.axisAngle = v => {
	let [x, y, z] = v.dump()
	let l = sqrt(x*x + y*y + z*z)
	let s = sin(0.5*l)
	return new Quat(s*z/l, s*x/l, s*y/l, cos(0.5*l))
}

Quat.rand = () => {
	let l0 = log(1 - rand())
	let l1 = log(1 - rand())
	let a0 = tau*rand()
	let a1 = tau*rand()
	let m0 = sqrt(l0/(l0 + l1))
	let m1 = sqrt(l1/(l0 + l1))
	return new Quat(
		m1*sin(a1),
		m0*sin(a0),
		m1*cos(a1),
		m0*cos(a0)
	)
}

Quat.prototype.dump = () => {
	return [this.x, this.y, this.z, this.w]
}

Quat.prototype.dumpH = () => {
	return [hyp*this.w, hyp*this.x, hyp*this.y, hyp*this.z]
}

Quat.prototype.mul = b => {
	return new Quat(
		this.w*b.w - this.x*b.x - this.y*b.y - this.z*b.z,
		this.w*b.x + this.x*b.w + this.y*b.z - this.z*b.y,
		this.w*b.y - this.x*b.z + this.y*b.w + this.z*b.x,
		this.w*b.z + this.x*b.y - this.y*b.x + this.z*b.w
	)
}

Quat.prototype.pow = n => {
	let w, x, y, z = this.dump()
	let t = n*acos(w)
	let s = sin(t)/sqrt(x*x + y*y + z*z)
	return new Quat(cos(t), s*x, s*y, s*z)
}

Quat.prototype.toString = () => {
	return "Quat(" + this.w + ", " + this.x + ", " + this.y + ", " + this.z + ")"
}

export {Quat}