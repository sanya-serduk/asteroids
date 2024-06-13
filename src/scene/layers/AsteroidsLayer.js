import Asteroid from "../../entities/Asteroid";
import Helper from "../../system/Helper";
import Collision from "../../system/collision/Collision";

export default class AsteroidsLayer {
	constructor(ctx, scene, props = {}) {
		this.ctx = ctx
		this.scene = scene
		this.asteroids = []
		this.maxNum = props.maxNum || 5
		this.timoutCreateAsteroids = this.maxNum * 100
		this.boostState = false
		this.boost = 0
		this.boostStep = 0
		this.boostMax = 0
		this.offsetCreate = 150
		this.offsetRemove = 200
	}

	setBoost(state, step = 0, max = 0) {
		this.boostState = state
		this.boost = 0
		this.boostStep = step
		this.boostMax = max
	}

	clear() {
		for (let i = 0; i < this.asteroids.length; i++) {
			const rect = this.asteroids[i].getShapeRect(0, 0)
			this.scene.systemCollisionParticles.create(this.asteroids[i].x, this.asteroids[i].y, rect.w, rect.h, this.asteroids[i].color)
		}

		this.asteroids.length = 0
	}

	resetCreateTimeout() {
		this.timoutCreateAsteroids = this.maxNum * 100
	}

	createAsteroid(props) {
		this.asteroids.push(new Asteroid(this.ctx, props))
	}

	createAsteroidFragment({ x, y, dist, angle, minW, maxW, color, speed = Helper.getRandomInteger(4, 6) }) {
		const angleOffset = Helper.getRandomDecimal(-(Math.PI/6), Math.PI/6, 2)
		return {
			color, speed,
			x: x + Math.cos(angle + angleOffset) * dist,
			y: y + Math.sin(angle + angleOffset) * dist,
			min: minW,
			max: maxW,
			direction: angle + angleOffset
		}
	}

	addAsteroids(asteroids) {
		asteroids.forEach(asteroid => this.createAsteroid(asteroid))
	}

	generateAsteroid(delta) {
		if (this.asteroids.length >= this.maxNum) {
			return
		}

		if (this.timoutCreateAsteroids > (this.maxNum - this.asteroids.length) * 100) {
			this.timoutCreateAsteroids -= 1 * delta
			return
		}

		if (this.boostState && this.boost < this.boostMax) {
			this.boost += this.boostStep
		}

		const cameraPosition = app.camera.position
		const cameraSize = app.camera.size
		const offsetX = cameraSize.w / 8
		const offsetY = cameraSize.h / 8

		const startPoint = Helper.getRandomPositionOnBordersRect({
			top:    cameraPosition.top    - this.offsetCreate,
			right:  cameraPosition.right  + this.offsetCreate,
			bottom: cameraPosition.bottom + this.offsetCreate,
			left:   cameraPosition.left   - this.offsetCreate
		})

		const endPoint = {
			x: Helper.getRandomInteger(cameraPosition.left + offsetX, cameraPosition.right  - offsetX),
			y: Helper.getRandomInteger(cameraPosition.top  + offsetY, cameraPosition.bottom - offsetY)
		}

		this.createAsteroid({
			...startPoint,
			direction: Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x),
			speed: Helper.getRandomInteger(2, 4) + this.boost
		})
	}

	draw() {
		const cameraPosition = app.camera.position
		const cameraRect = {
			x: cameraPosition.left,
			y: cameraPosition.top,
			w: cameraPosition.right - cameraPosition.left,
			h: cameraPosition.bottom - cameraPosition.top,
		}
		this.asteroids.forEach(asteroid => {
			if (!asteroid.destroyed && Collision.RectRect(cameraRect, asteroid.getShapeRect(0,0))) {
				asteroid.draw()
			}
		})
	}

	update(delta) {
		const cameraPosition = app.camera.position
		const fragments = []

		for (let i = 0; i < this.asteroids.length - 1; i++) {
			if (this.asteroids[i].destroyed) {
				continue
			}

			const obj1 = this.asteroids[i]
			const obj1Move = obj1.getNextMove(delta)
			const obj1Rotate = obj1.getNextRotate(delta)
			const obj1Rect = obj1.getShapeRect(obj1Move.x, obj1Move.y)

			for (let j = i + 1; j < this.asteroids.length; j++) {
				if (this.asteroids[j].destroyed) {
					continue
				}

				const obj2 = this.asteroids[j]
				const obj2Move = obj2.getNextMove(delta)
				const obj2Rotate = obj2.getNextRotate(delta)
				const obj2Rect = obj2.getShapeRect(obj2Move.x, obj2Move.y)

				if (Collision.RectRect(obj1Rect, obj2Rect)) {
					const obj1Polygon = obj1.getShapePolygon(obj1Move.x, obj1Move.y, obj1Rotate)
					const obj2Polygon = obj2.getShapePolygon(obj2Move.x, obj2Move.y, obj2Rotate)

					if (Collision.PolygonPolygon(obj1Polygon, obj2Polygon)) {
						if (obj1Rect.w * obj1Rect.h > 30000 || obj2Rect.w * obj2Rect.h > 30000) {
							const x = (obj1.x + obj2.x) / 2
							const y = (obj1.y + obj2.y) / 2
							const w = Math.max(obj1Rect.w, obj2Rect.w)
							const minW = Math.round(w/8)
							const maxW = Math.round(w/4)
							const angle = Helper.getRandomDecimal(0, Math.PI*2, 2)
							const color1 = obj1Rect.w > obj2Rect.w ? obj1.color : obj2.color
							const color2 = obj1Rect.w > obj2Rect.w ? obj2.color : obj1.color
							const speed = Math.min(Math.max(obj1.speed, obj2.speed) + 2, 8)
							fragments.push(
								this.createAsteroidFragment({ speed, dist: minW+maxW, minW, maxW, x, y, color: color1, angle: angle }),
								this.createAsteroidFragment({ speed, dist: minW+maxW, minW, maxW, x, y, color: color1, angle: angle + Math.PI/1.5 }),
								this.createAsteroidFragment({ speed, dist: minW+maxW, minW, maxW, x, y, color: color2, angle: angle + Math.PI/1.5*2 }),
							)
						}

						this.scene.systemCollisionParticles.create(obj1.x, obj1.y, obj1Rect.w, obj1Rect.h, obj1.color)
						this.scene.systemCollisionParticles.create(obj2.x, obj2.y, obj2Rect.w, obj2Rect.h, obj2.color)
						obj1.destroyed = true
						obj2.destroyed = true
						break
					}
				}
			}
		}

		this.asteroids = this.asteroids.filter(asteroid => {
			if (asteroid.destroyed
				|| asteroid.x + asteroid.shapeRect.w / 2 + this.offsetRemove < cameraPosition.left
				|| asteroid.x - asteroid.shapeRect.w / 2 - this.offsetRemove > cameraPosition.right
				|| asteroid.y + asteroid.shapeRect.h / 2 + this.offsetRemove < cameraPosition.top
				|| asteroid.y - asteroid.shapeRect.h / 2 - this.offsetRemove > cameraPosition.bottom) {
				return false
			}

			asteroid.update(delta)
			return true
		})

		this.addAsteroids(fragments)
		this.generateAsteroid(delta)
	}
}