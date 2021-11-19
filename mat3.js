function Mat3(
	xx, yx, zx,
	xy, yy, zy,
	xz, yz, zz
) {
	this.xx = xx
	this.yx = yx
	this.zx = zx

	this.xy = xy
	this.yy = yy
	this.zy = zy

	this.xz = xz
	this.yz = yz
	this.zz = zz
}

let cos = Math.cos
let sin = Math.sin
let log = Math.log
let rand = Math.random
let sqrt = Math.sqrt

let hyp = 1.41421356237
let tau = 3.14159265359
let identity = new Mat3(1, 0, 0, 0, 1, 0, 0, 0, 1)

Mat3.identity = identity

Mat3.inv = () => {
	let det =
		this.zx*(this.xy*this.yz - this.xz*this.yy) +
		this.zy*(this.xz*this.yx - this.xx*this.yz) +
		this.zz*(this.xx*this.yy - this.xy*this.yx)
	return new Mat3(
		(this.yy*this.zz - this.yz*this.zy)/det,
		(this.yz*this.zx - this.yx*this.zz)/det,
		(this.yx*this.zy - this.yy*this.zx)/det,
		(this.xz*this.zy - this.xy*this.zz)/det,
		(this.xx*this.zz - this.xz*this.zx)/det,
		(this.xy*this.zx - this.xx*this.zy)/det,
		(this.xy*this.yz - this.xz*this.yy)/det,
		(this.xz*this.yx - this.xx*this.yz)/det,
		(this.xx*this.yy - this.xy*this.yx)/det
	)
}

Mat3.trans = () => {
	return new Mat3(
		this.xx, this.xy, this.xz,
		this.yx, this.yy, this.yz,
		this.zx, this.zy, this.zz
	)
}

Mat3.det = () => {
	return this.zx*(this.xy*this.yz - this.xz*this.yy) + this.zy*(this.xz*this.yx - this.xx*this.yz) + this.zz*(this.xx*this.yy - this.xy*this.yx)
}

Mat3.trace = () => {
	return this.xx + this.yy + this.zz
}

Mat3.eulerAnglesYXZ = (x, y, z) => {
	let cy = cos(y), sy = sin(y)
	let cx = cos(x), sx = sin(x)
	let cz = cos(z), sz = sin(z)

	return new Mat3(
		cy*cz + sx*sy*sz, cz*sx*sy - cy*sz, cx*sy,
		cx*sz, cx*cz, -sx,
		cy*sx*sz - cz*sy, cy*cz*sx + sy*sz, cx*cy
	)
}

Mat3.quat = q => {
	let [w, x, y, z] = q.dumpH()

	return new Mat3(
		w*w + x*x - 1, x*y - z*w, x*z + y*w,
		x*y + z*w, w*w + y*y - 1, y*z - x*w,
		x*z - y*w, y*z + x*w, w*w + z*z - 1
	)
}

Mat3.look = b => {
	let ax, ay, az = this.dump()
	let bx, by, bz = b.dump()
	let x = ay*bz - az*by
	let y = az*bx - ax*bz
	let z = ax*by - ay*bz
	let d = ax*bx + ay*by + az*bz
	let m = sqrt(d*d + x*x + y*y + z*z)
	let w = d + m
	let q = 1/(m*w)
	if (q < 1e+12) {
		return new Mat3(
			q*(w*w + x*x) - 1, q*(x*y - z*w), q*(x*z + y*w),
			q*(x*y + z*w), q*(w*w + y*y) - 1, q*(y*z - x*w),
			q*(x*z - y*w), q*(y*z + x*w), q*(w*w + z*z) - 1
		)
	}
	return identity
}

Mat3.axisAngle = v => {
	let x, y, z = v.unit().dump()
	let m = v.magnitude()
	let s = sin(m)
	let c = cos(m)
	let t = 1 - c
	return new Mat3(
		t*x*x + c, t*x*y - z*s, t*x*z + y*s,
		t*x*y + z*s, t*y*y + c, t*y*z - x*s,
		t*x*z - y*s, t*y*z + x*s, t*z*z + c
	)
}

Mat3.rand = () => {
	let l0 = log(1 - rand())
	let l1 = log(1 - rand())
	let a0 = tau*rand()
	let a1 = tau*rand()
	let m0 = hyp*sqrt(l0/(l0 + l1))
	let m1 = hyp*sqrt(l1/(l0 + l1))
	let w = m0*cos(a0)
	let x = m0*sin(a0)
	let y = m1*cos(a1)
	let z = m1*sin(a1)
	return new Mat3(
		w*w + x*x - 1, x*y - z*w, x*z + y*w,
		x*y + z*w, w*w + y*y - 1, y*z - x*w,
		x*z - y*w, y*z + x*w, w*w + z*z - 1
	)
}

Mat3.dump = () => {
	return [
		this.xx, this.yx, this.zx,
		this.xy, this.yy, this.zy,
		this.xz, this.yz, this.zz
	]
}

Mat3.prototype.add = b => {
	return new Mat3(
		this.xx + b.xx, this.yx + b.yx, this.zx + b.zx,
		this.xy + b.xy, this.yy + b.yy, this.zy + b.zy,
		this.xz + b.xz, this.yz + b.yz, this.zz + b.zz
	)
}

Mat3.prototype.sub = b => {
	return new Mat3(
		this.xx - b.xx, this.yx - b.yx, this.zx - b.zx,
		this.xy - b.xy, this.yy - b.yy, this.zy - b.zy,
		this.xz - b.xz, this.yz - b.yz, this.zz - b.zz
	)
}

Mat3.prototype.mul = b => {
	let atype = type(this)
	let btype = ctype(b)
	if (atype == 'number') {
		return new Mat3(
			a*b.xx, a*b.yx, a*b.zx,
			a*b.xy, a*b.yy, a*b.zy,
			a*b.xz, a*b.yz, a*b.zz
		)
	}
	else {
		if (btype == 'number') {
			return new Mat3(
				this.xx*b, this.yx*b, this.zx*b,
				this.xy*b, this.yy*b, this.zy*b,
				this.xz*b, this.yz*b, this.zz*b
			)
		}
		else if (btype == 'vec3') {
			return new Mat3(
				this.xx*b.x + this.yx*b.y + this.zx*b.z,
				this.xy*b.x + this.yy*b.y + this.zy*b.z,
				this.xz*b.x + this.yz*b.y + this.zz*b.z
			)
		}
		else {
			return new Mat3(
				this.xx*b.xx + this.yx*b.xy + this.zx*b.xz,
				this.xx*b.yx + this.yx*b.yy + this.zx*b.yz,
				this.xx*b.zx + this.yx*b.zy + this.zx*b.zz,
				this.xy*b.xx + this.yy*b.xy + this.zy*b.xz,
				this.xy*b.yx + this.yy*b.yy + this.zy*b.yz,
				this.xy*b.zx + this.yy*b.zy + this.zy*b.zz,
				this.xz*b.xx + this.yz*b.xy + this.zz*b.xz,
				this.xz*b.yx + this.yz*b.yy + this.zz*b.yz,
				this.xz*b.zx + this.yz*b.zy + this.zz*b.zz
			)
		}
	}
}

Mat3.prototype.div = b => {
	return new Mat3(
		this.xx/b, this.yx/b, this.zx/b,
		this.xy/b, this.yy/b, this.zy/b,
		this.xz/b, this.yz/b, this.zz/b
	)
}

Mat3.prototype.unm = () => {
	return new Mat3(
		-this.xx, -this.yx, -this.zx,
		-this.xy, -this.yy, -this.zy,
		-this.xz, -this.yz, -this.zz
	)
}

Mat3.prototype.toString = () => {
	return 'Mat3(' +
		this.xx + ', ' + this.yx + ', ' + this.zx + ', ' +
		this.xy + ', ' + this.yy + ', ' + this.zy + ', ' +
		this.xz + ', ' + this.yz + ', ' + this.zz + ')'
}

export {Mat3}