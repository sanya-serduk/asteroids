import RoundedPolygon from "../../figures/RoundedPolygon";
import Helper from "../../system/Helper";
import Collision from "../../system/collision/Collision";
import ShapeHelper from "../../system/collision/shapes/ShapeHelper";

export default class LoadLayer {
	constructor(ctx) {
		this.ctx = ctx
		this.x = 0
		this.y = 0
		this.icon = new RoundedPolygon([
			{ x: 0, y: 80 },
			{ x: 40, y: 0 },
			{ x: 80, y: 80 },
			{ x: 40, y: 60 }
		], 5)
		this.iconPosition = { x:0, y:0 }
		this.iconShapeRect = ShapeHelper.getRectFromPolygonRotate(this.icon.polygon)
		this.color = '#96919d'
		this.rotate = 0
		this.stepRotate = 0.14
		this.isLoaded = false
		this.backAlpha = 1
		this.speed = 0
		this.timeout = 15
		this.loadedCallback = null
	}

	loaded(callback = null) {
		this.loadedCallback = callback
		this.isLoaded = true
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.fillStyle = `rgba(34, 30, 36, ${ this.backAlpha })`
		this.ctx.fillRect(-app.size.w/2, -app.size.h/2, app.size.w, app.size.h)

		this.ctx.translate(this.iconPosition.x, this.iconPosition.y)
		this.ctx.rotate(this.rotate)
		this.ctx.beginPath()
		this.ctx.lineWidth = 5
		this.ctx.strokeStyle = this.color
		this.ctx.stroke(this.icon.path2D)

		this.ctx.restore()
	}

	iconVisible() {
		return Collision.RectRect({
			x: this.iconPosition.x + this.iconShapeRect.x,
			y: this.iconPosition.y + this.iconShapeRect.y,
			w: this.iconShapeRect.w,
			h: this.iconShapeRect.h,
		}, {
			x: -app.size.w/2,
			y: -app.size.h/2,
			w: app.size.w,
			h: app.size.h,
		})
	}

	update(delta) {
		if (this.isLoaded && !this.timeout && !this.iconVisible() && !this.backAlpha) {
			app.scene.removeLayer('Load')
			return
		}


		if (this.isLoaded && !this.timeout && this.stepRotate <= 0.07) {
			this.speed += 0.5 * delta
			this.stepRotate = Math.max(this.stepRotate - 0.001 * delta, 0)
			this.backAlpha = Math.max(this.backAlpha - 0.015 * delta, 0)
			const { x, y } = Helper.velocity({
				x: Math.cos(this.rotate - Math.PI/2) * this.speed,
				y: Math.sin(this.rotate - Math.PI/2) * this.speed,
			}, this.speed)

			this.iconPosition.x += x * delta
			this.iconPosition.y += y * delta
			if (this.loadedCallback !== null && this.backAlpha < 0.8) {
				this.loadedCallback()
				this.loadedCallback = null
			}
		} else if (this.isLoaded && !this.timeout && this.stepRotate > 0.07) {
			this.stepRotate = Math.max(this.stepRotate - 0.001 * delta, 0)
		}

		this.timeout = Math.max(this.timeout - 1 * delta, 0)
		this.rotate += this.stepRotate * delta

		if (this.rotate > Math.PI * 2 ) {
			this.rotate -= Math.PI * 2
		}
	}
}