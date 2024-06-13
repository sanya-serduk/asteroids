import ShapePolygon from "../system/collision/shapes/ShapePolygon";
import ShapeHelper from "../system/collision/shapes/ShapeHelper";
import RoundedPolygon from "../figures/RoundedPolygon";
import Helper from "../system/Helper";

export default class Asteroid {
	constructor(ctx, props = {}) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.rotate = 0
		this.speed = props.speed || 0
		this.direction = props.direction || 0
		this.step = Helper.velocity({
			x: Math.cos(this.direction) * this.speed,
			y: Math.sin(this.direction) * this.speed,
		}, this.speed)
		this.stepRotate = Helper.getRandomDecimal(-0.02, 0.02, 2)
		this.figure = new RoundedPolygon(
			Helper.getRandomPolygon({
				min: props.min || Helper.getRandomInteger(30, 50),
				max: props.max || Helper.getRandomInteger(100, 150),
				num: Helper.getRandomInteger(4, 8)
			}),
			Helper.getRandomInteger(70, 100)
		)
		this.path2D = this.figure.path2D
		this.shapePolygon = new ShapePolygon(this.figure.polygon)
		this.shapeRect = ShapeHelper.getRectFromPolygonRotate(this.shapePolygon.points)
		this.color = props.color || Helper.getRandomArguments(
			'hsl(0, 50%, 50%)',
			'hsl(120, 35%, 50%)',
			'hsl(230, 50%, 50%)',
		)
		this.destroyed = false
	}

	getShapeRect(x, y) {
		return ShapeHelper.getRectOnMoveRect({
			x: this.x + this.shapeRect.x,
			y: this.y + this.shapeRect.y,
			w: this.shapeRect.w,
			h: this.shapeRect.h,
		}, x, y)
	}

	getShapePolygon(x, y, rotate) {
		return this.shapePolygon.points.map(point => {
			const dist = Helper.distance(point)
			const angle = Math.atan2(point.y, point.x) + this.rotate + rotate
			return {
				x: this.x + x + Math.cos(angle) * (dist),
				y: this.y + y + Math.sin(angle) * (dist),
			}
		})
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.rotate(this.rotate)
		this.ctx.lineWidth = 5
		this.ctx.strokeStyle = this.color
		this.ctx.stroke(this.path2D)
		this.ctx.restore()
	}

	getNextMove(delta) {
		return {
			x: this.step.x * delta,
			y: this.step.y * delta,
		}
	}

	getNextRotate(delta) {
		return this.stepRotate * delta
	}

	update(delta) {
		this.x += this.step.x * delta
		this.y += this.step.y * delta
		this.rotate += this.stepRotate * delta
	}
}