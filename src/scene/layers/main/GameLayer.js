import Player from "../../../entities/Player";
import TimerArtefact from "../../../system/TimerArtefact";
import Collision from "../../../system/collision/Collision";
import Armor from "../../../entities/Armor";
import Helper from "../../../system/Helper";
import GameInfoLayer from "./GameInfoLayer";
import GameControlPanelLayer from "./GameControlPanelLayer";

export default class GameLayer {
	constructor(ctx, scene) {
		this.ctx = ctx
		this.scene = scene
		this.player = new Player(ctx)
		this.armors = []
		this.timerArtefact = new TimerArtefact(15, 15)
		this.infoLayer = new GameInfoLayer(ctx, this.player)
		this.controlPanelLayer = new GameControlPanelLayer(ctx)
		this.init()
	}

	init() {
		this.scene.systemAsteroids.clear()
		this.scene.systemAsteroids.resetCreateTimeout()
		this.scene.systemAsteroids.setBoost(true, 0.025, 4)
		app.camera.follow(this.player)
	}

	destroy() {
		this.controlPanelLayer.destroy()
		this.player.destroy()
		app.user.endGame()
		app.camera.unFollow()
	}

	draw() {
		this.armors.forEach(armor => armor.draw())
		this.player.draw()
		this.infoLayer.draw()

		if (Helper.isTouchDevice) {
			this.controlPanelLayer.draw()
		}
	}

	update(delta) {
		const asteroidFragments = []
		const playerMove = this.player.getNextMove(delta)
		const playerRotate = this.player.getNextRotate(delta)
		const playerRect = this.player.getShapeRect(playerMove.x, playerMove.y)
		const playerPolygon = this.player.getShapePolygon(playerMove.x, playerMove.y, playerRotate)
		const cameraPosition = app.camera.position
		const cameraRect = {
			x: cameraPosition.left,
			y: cameraPosition.top,
			w: cameraPosition.right - cameraPosition.left,
			h: cameraPosition.bottom - cameraPosition.top
		}

		this.armors = this.armors.filter(armor => {
			if (Collision.RectRect(armor.getShapeRect(), playerRect)) {
				if (Collision.PolygonPolygon(armor.getShapePolygon(), playerPolygon)) {
					this.player.upArmor(100)
					return false
				}
			}
			return true
		})

		for (let i = 0; i < this.scene.systemAsteroids.asteroids.length; i++) {
			if (this.scene.systemAsteroids.asteroids[i].destroyed) {
				continue
			}

			const asteroid = this.scene.systemAsteroids.asteroids[i]
			const asteroidMove = asteroid.getNextMove(delta)
			const asteroidRotate = asteroid.getNextRotate(delta)
			const asteroidRect = asteroid.getShapeRect(asteroidMove.x, asteroidMove.y)
			const asteroidPolygon = asteroid.getShapePolygon(asteroidMove.x, asteroidMove.y, asteroidRotate)

			if (Collision.RectRect(asteroidRect, playerRect)) {
				if (Collision.PolygonPolygon(asteroidPolygon, playerPolygon)) {
					asteroid.destroyed = true
					this.scene.systemCollisionParticles.create(this.player.x, this.player.y, playerRect.w*2, playerRect.h*2, '#cac7ce')
					this.scene.systemCollisionParticles.create(asteroid.x, asteroid.y, asteroidRect.w, asteroidRect.h, asteroid.color)

					if (this.player.armor > 0) {
						this.player.downArmor(25)
					} else {
						this.scene.changeLayer('GameOver', app.user.score)
					}

					continue
				}
			}

			for (let j = 0; j < this.player.bullets.length; j++) {
				if (this.player.bullets[j].destroyed) {
					continue
				}

				const bull = this.player.bullets[j]
				const bullMove = bull.getNextMove(delta)
				const bullRect = bull.getShapeRect(bullMove.x, bullMove.y)

				if (!Collision.RectRect(bullRect, cameraRect)) {
					bull.destroyed = true
					continue
				}

				if (Collision.RectRect(bullRect, asteroidRect)) {
					if (Collision.PolygonPolygon(bull.getShapePolygon(bullMove.x, bullMove.y), asteroidPolygon)) {
						bull.destroyed = true
						asteroid.destroyed = true
						this.scene.systemCollisionParticles.create(asteroid.x, asteroid.y, asteroidRect.w, asteroidRect.h, asteroid.color)
						app.user.upScore(10)
						this.timerArtefact.update()

						if (this.timerArtefact.time <= 0) {
							this.armors.push(new Armor(this.ctx, asteroid.x, asteroid.y))
							this.timerArtefact.reset()
						}

						if (asteroidRect.w * asteroidRect.h > 30000) {
							const minW = Math.round(asteroidRect.w/8)
							const maxW = Math.round(asteroidRect.w/4)
							const dist = asteroidRect.w/4
							const angle = Helper.getRandomDecimal(0, Math.PI*2, 2)
							const speed = Math.min(asteroid.speed + 2, 8)
							asteroidFragments.push(
								this.scene.systemAsteroids.createAsteroidFragment({ speed, dist, minW, maxW, x: asteroid.x, y: asteroid.y, angle: angle + Math.PI/2, color: asteroid.color }),
								this.scene.systemAsteroids.createAsteroidFragment({ speed, dist, minW, maxW, x: asteroid.x, y: asteroid.y, angle: angle - Math.PI/2, color: asteroid.color })
							)
						}
					}
				}
			}
		}

		this.player.move(playerMove.x, playerMove.y, playerRotate)
		this.player.update(delta)
		this.infoLayer.update(delta)

		if (Helper.isTouchDevice) {
			this.controlPanelLayer.update(delta)
		}

		this.scene.systemAsteroids.addAsteroids(asteroidFragments)
	}
}