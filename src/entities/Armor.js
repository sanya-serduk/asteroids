import RoundedPolygon from "../figures/RoundedPolygon";
import ShapePolygon from "../system/collision/shapes/ShapePolygon";
import ShapeHelper from "../system/collision/shapes/ShapeHelper";
import Helper from "../system/Helper";

export default class Armor {
	constructor(ctx, x, y, color) {
		this.ctx = ctx
		this.x = x
		this.y = y
		this.figure = new RoundedPolygon([
			{ x: 0,  y: 0 },
			{ x: 10, y: 0 },
			{ x: 30, y: 0 },
			{ x: 40, y: 0 },
			{ x: 40, y: 30 },
			{ x: 20, y: 40 },
			{ x: 0,  y: 30 },
		], 20)
		this.path2D = this.figure.path2D
		this.shapePolygon = new ShapePolygon(this.figure.polygon)
		this.shapeRect = ShapeHelper.getRectFromPolygonRotate(this.shapePolygon.points)
		this.color = color || '#96919d'
	}

	getShapeRect() {
		return {
			x: this.x + this.shapeRect.x,
			y: this.y + this.shapeRect.y,
			w: this.shapeRect.w,
			h: this.shapeRect.h,
		}
	}

	getShapePolygon() {
		return this.shapePolygon.points.map(point => {
			const dist = Helper.distance(point)
			const angle = Math.atan2(point.y, point.x)
			return {
				x: this.x + Math.cos(angle) * dist,
				y: this.y + Math.sin(angle) * dist,
			}
		})
	}

	updatePosition(x, y) {
		this.x = x
		this.y = y
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.beginPath()
		this.ctx.lineWidth = 5
		this.ctx.strokeStyle = this.color
		this.ctx.stroke(this.path2D)
		this.ctx.restore()
	}

}