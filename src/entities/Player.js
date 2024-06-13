import Driving from "../system/Driving";
import RoundedPolygon from "../figures/RoundedPolygon";
import ShapePolygon from "../system/collision/shapes/ShapePolygon";
import ShapeHelper from "../system/collision/shapes/ShapeHelper";
import DriveParticle from "./DriveParticle";
import Bullet from "./Bullet";
import Helper from "../system/Helper";

export default class Player {
	constructor(ctx) {
		this.ctx = ctx
		this.x = app.camera.x
		this.y = app.camera.y
		this.armor = 0
		this.speed = 6
		this.driving = new Driving(this.speed)
		this.rotate = 0
		this.figure = new RoundedPolygon([
			{ x: 0, y: 80 },
			{ x: 40, y: 0 },
			{ x: 80, y: 80 },
			{ x: 40, y: 60 }
		], 5)
		this.path2D = this.figure.path2D
		this.shapePolygon = new ShapePolygon(this.figure.polygon)
		this.shapeRect = ShapeHelper.getRectFromPolygonRotate(this.shapePolygon.points)
		this.color = '#96919d'
		this.driveParticles = []
		this.bullets = []
		this.handlerEventMousedown = this.eventMousedown.bind(this)
		this.handlerEventMouseup = this.eventMouseup.bind(this)
		this.handlerEventButtonFire = this.eventButtonFire.bind(this)
		this.fireTimer = 0
		this.fireTimeout = 15
		this.fireState = 0
		this.armorFillStyle = this.ctx.createRadialGradient(0,0,0,0,0,60)
		this.armorFillStyle.addColorStop(0.5, 'rgba(0,0,0,0)')
		this.armorFillStyle.addColorStop(1, 'rgba(150,145,157,0.1)')
		this.armorStrokeStyle = 'rgba(150,145,157,0.2)'
		this.init()
	}

	init() {
		app.cnv.addEventListener('mousedown', this.handlerEventMousedown)
		app.cnv.addEventListener('mouseup', this.handlerEventMouseup)
		app.stateButtons.on('player_control', 'fire', this.handlerEventButtonFire)
	}

	destroy() {
		app.cnv.removeEventListener('mousedown', this.handlerEventMousedown)
		app.cnv.removeEventListener('mouseup', this.handlerEventMouseup)
		app.stateButtons.off('player_control', 'fire', this.handlerEventButtonFire)
	}

	eventButtonFire(state) {
		if (state) {
			this.fireState = 1

			if (this.fireTimer === 0) {
				this.generateBullets()
				this.fireTimer += 1
			}
		} else {
			this.fireTimer = 0
			this.fireState = 0
		}
	}

	eventMousedown(e) {
		if (Helper.isTouchDevice) {
			return
		}

		this.fireState = 1

		if (this.fireTimer === 0) {
			this.generateBullets()
			this.fireTimer += 1
		}
	}

	eventMouseup(e) {
		if (Helper.isTouchDevice) {
			return
		}

		this.fireTimer = 0
		this.fireState = 0
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
				x: this.x + x + Math.cos(angle) * dist,
				y: this.y + y + Math.sin(angle) * dist,
			}
		})
	}

	upArmor(num) {
		this.armor += num
	}

	downArmor(num) {
		this.armor -= num
	}

	draw() {
		this.driveParticles.forEach(particle => particle.draw())
		this.bullets.forEach(bullet => bullet.draw())
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.rotate(this.rotate)

		if (this.armor) {
			this.ctx.beginPath()
			this.ctx.arc(0, 0, 60, 0, Math.PI*2)
			this.ctx.fillStyle = this.armorFillStyle
			this.ctx.fill()

			this.ctx.beginPath()
			this.ctx.arc(0, 0, 60, 0, Math.PI*2)
			this.ctx.strokeStyle = this.armorStrokeStyle
			this.ctx.stroke()
		}

		this.ctx.beginPath()
		this.ctx.lineWidth = 5
		this.ctx.strokeStyle = this.color
		this.ctx.stroke(this.path2D)
		this.ctx.restore()
	}

	move(x, y, rotate = 0) {
		this.x += x
		this.y += y
		this.rotate += rotate
	}

	generateBullets() {
		this.bullets.push(new Bullet(this.ctx, {
			x: this.x + Math.cos(this.rotate - Math.PI/2) * 50,
			y: this.y + Math.sin(this.rotate - Math.PI/2) * 50,
			angle: this.rotate
		}))
	}

	generateDriveParticles() {
		const speedCurrent = this.driving.getSpeedCurrent()
		const speedDirection = this.driving.getSpeedDirection()
		if (speedCurrent) {
			this.driveParticles.push(new DriveParticle(this.ctx, {
				x: this.x,
				y: this.y,
				angle: speedDirection === 'up' ? this.rotate : this.rotate - Math.PI,
				type: speedDirection,
				speed: 1 / this.speed * speedCurrent,
				speedCurrent
			}))
		}
	}

	getStateControlButton(name) {
		return app.keyboard.getState(name) || app.stateButtons.getState('player_control', name)
	}

	getNextMove(delta) {
		const nextMove = this.driving.getMove(
			this.getStateControlButton('up'),
			this.getStateControlButton('down'),
			this.rotate,
			delta
		)

		return {
			x: nextMove.x * delta,
			y: nextMove.y * delta,
		}
	}

	getNextRotate(delta) {
		const nextRotate = this.driving.getRotation(
			this.getStateControlButton('down'),
			this.getStateControlButton('left'),
			this.getStateControlButton('right'),
			delta
		)

		return nextRotate * delta
	}

	update(delta) {
		this.bullets = this.bullets.filter(bullet => {
			if (bullet.destroyed) {
				return false
			}

			bullet.update(delta)
			return true
		})

		this.driveParticles = this.driveParticles.filter(particle => {
			if (!particle.destroyed) {
				particle.update(delta)
				return true
			}

			return false
		})

		this.generateDriveParticles()

		if (this.fireState && this.fireTimer !== 0) {
			if (this.fireTimer < this.fireTimeout) {
				this.fireTimer += 1 * delta
			} else {
				this.fireTimer = 1
				this.generateBullets()
			}
		}
	}
}