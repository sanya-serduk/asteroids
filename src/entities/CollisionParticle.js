import Helper from "../system/Helper";

export default class CollisionParticle {
	constructor(ctx, x, y, color) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.r = 0
		this.maxR = Helper.getRandomInteger(5, 10)
		this.destroyed = false
		this.a = 0
		this.increment = Helper.getRandomDecimal(Math.PI/50, Math.PI/30, 2)
		this.angle = Helper.getRandomDecimal(0, Math.PI*2, 2)
		this.speed = Helper.getRandomDecimal(0.1, 2, 2)
		this.color = color || Helper.getRandomArguments('#9e99a6', '#d9d2e3')
		this.opacity = Helper.getRandomDecimal(0.5, 1, 2)
		this.step = Helper.velocity({
			x: Math.cos(this.angle) * this.speed,
			y: Math.sin(this.angle) * this.speed
		}, this.speed)
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.beginPath()
		this.ctx.fillStyle = this.color
		this.ctx.globalAlpha = this.opacity
		this.ctx.arc(0,0, this.r, 0, Math.PI*2)
		this.ctx.fill()
		this.ctx.restore()
	}

	update(delta) {
		if (this.destroyed) {
			return
		}

		this.r = Math.sin(this.a) * this.maxR
		this.a += this.increment * delta

		if (this.a >= Math.PI) {
			this.destroyed = true
		}

		this.x += this.step.x * delta
		this.y += this.step.y * delta
	}
}