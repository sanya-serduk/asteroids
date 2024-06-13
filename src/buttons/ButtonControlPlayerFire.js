import ButtonControlPlayer from "./ButtonControlPlayer";

export default class ButtonControlPlayerFire extends ButtonControlPlayer {
	constructor(ctx, props) {
		super(ctx, props)
		//this.init()
	}

	// init() {
	// 	const path = new Path2D()
	// 	path.arc(0, 0, 30, 0, Math.PI * 2)
	// 	path.closePath()
	// 	this.path2D.addPath(path)
	// }

	draw() {
		super.draw()
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		this.ctx.beginPath()
		this.ctx.lineWidth = 6
		this.ctx.strokeStyle = this.iconColor
		const min = 25
		const max = 65

		this.ctx.moveTo(-max, 0)
		this.ctx.lineTo(-min, 0)

		this.ctx.moveTo(min, 0)
		this.ctx.lineTo(max, 0)

		this.ctx.moveTo(0, -max)
		this.ctx.lineTo(0, -min)

		this.ctx.moveTo(0, max)
		this.ctx.lineTo(0, min)

		this.ctx.stroke()

		this.ctx.beginPath()
		this.ctx.lineWidth = 8
		this.ctx.strokeStyle = this.iconColor
		this.ctx.arc(0, 0, 45, 0, Math.PI * 2)
		this.ctx.stroke()

		this.ctx.restore()
	}
}