import ShapeHelper from "../system/collision/shapes/ShapeHelper";
import Helper from "../system/Helper";

export default class Bullet {
	constructor(ctx, { x, y, angle }) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.r = 7
		this.angle = angle
		this.speed = 15
		this.color = '#cac7ce'
		this.step = Helper.velocity({
			x: Math.cos(this.angle - Math.PI/2) * this.speed,
			y: Math.sin(this.angle - Math.PI/2) * this.speed,
		}, this.speed)
	}

	getShapeRect(x, y) {
		return ShapeHelper.getRectOnMoveCircle({ x: this.x, y: this.y, r: this.r }, x, y)
	}

	getShapePolygon(x, y) {
		return ShapeHelper.getPolygonOnMoveCircle({ x: this.x, y: this.y, r: this.r }, x, y)
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

	getNextMove(delta) {
		return {
			x: this.step.x * delta,
			y: this.step.y * delta,
		}
	}

	update(delta) {
		this.x += this.step.x * delta
		this.y += this.step.y * delta
	}
}