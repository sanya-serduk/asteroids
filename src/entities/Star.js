import Helper from "../system/Helper";

export default class Star {
	constructor(ctx, { x, y, r }) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.r = r
		this.color = Helper.getRandomArguments('hsl(264,10%,40%)', 'hsl(221,10%,40%)')
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.beginPath()
		this.ctx.fillStyle = this.color
		this.ctx.arc(0, 0, this.r, 0, Math.PI * 2)
		this.ctx.fill()
		this.ctx.restore()
	}
}