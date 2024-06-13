import Helper from "../system/Helper";

export default class DriveParticle {
	constructor(ctx, { x, y, angle, type, speed, speedCurrent }) {
		this.ctx = ctx
		this.x = 0
		this.y = -28
		this.originPosition = { x, y }
		this.r = 8 * speed
		this.originR = 8
		this.angle = angle + Math.PI
		this.type = type
		this.color = 'rgb(202,199,206)'
		this.stepRadius = Helper.getRandomDecimal(0.05, 0.2, 2)
		this.rand = 0
		this.randStep = (Math.PI/4 * 0.1)
		this.dir = Helper.getRandomDecimal(-1, 1, 2)
		this.speed = speed
		this.diffX = 0.3
		this.speedCurrent = speedCurrent

		if (type === 'down') {
			this.stepRadius *= 2.5
			this.y = 28
			this.diffX = 3
		}

		this.destroyed = false
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.originPosition.x, this.originPosition.y)
		this.ctx.rotate(this.angle)
		this.ctx.fillStyle = `rgba(202,199,206, ${ this.r/this.originR*this.speed })`
		this.ctx.beginPath()
		this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		this.ctx.fill()
		this.ctx.restore()
	}

	update(delta) {
		if (Math.round(this.r) <= 1) {
			this.destroyed = true
			return
		}

		this.rand += this.rand + (this.randStep * delta) > Math.PI/2 ? (Math.PI/2-this.rand) * delta : this.randStep * delta
		this.r = Math.max(this.r - this.stepRadius * delta, 0)
		this.speedCurrent -=  this.speedCurrent > 0.2 * delta ? 0.2 * delta : 0
		this.x += (((Math.cos(this.rand) * (this.diffX)) + (this.r * 0.05)) * this.dir * this.speed) * delta
		this.y -= this.type === 'down' ? (Math.sin(this.rand) * this.speed - this.speedCurrent) * delta : (Math.sin(this.rand) * this.speed) * delta
	}
}