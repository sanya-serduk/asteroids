import StarsLayer from "./layers/StarsLayer";
import AsteroidsLayer from "./layers/AsteroidsLayer";
import MainMenuLayer from "./layers/main/MainMenuLayer";
import MainControlLayer from "./layers/main/MainControlLayer";
import MainAboutLayer from "./layers/main/MainAboutLayer";
import LayerManager from "../system/LayerManager";
import GameLayer from "./layers/main/GameLayer";
import CollisionParticlesLayer from "./layers/CollisionParticlesLayer";
import GameOverLayer from "./layers/main/GameOverLayer";

export default class Main {
	constructor(ctx) {
		this.ctx = ctx
		this.systemStars = new StarsLayer(ctx)
		this.systemCollisionParticles = new CollisionParticlesLayer(ctx)
		this.systemAsteroids = new AsteroidsLayer(ctx, this, { maxNum: 5 })
		this.layer = new LayerManager(ctx)
		this.isActive = false
		this.init()
	}

	init() {
		this.layer.add('Menu', MainMenuLayer)
		this.layer.add('Control', MainControlLayer)
		this.layer.add('About', MainAboutLayer)
		this.layer.add('Game', GameLayer)
		this.layer.add('GameOver', GameOverLayer)
		this.layer.start('Menu', this, { isActive: false })
		app.camera.reset()
	}

	setActive(bool) {
		this.isActive = bool

		if (this.layer.current !== null && 'setActive' in this.layer.current) {
			this.layer.current.setActive(this.isActive)
		}
	}

	changeLayer(name, props) {
		if (!this.isActive) {
			return
		}

		this.layer.start(name, this, props)
	}

	draw() {
		this.systemStars.draw()
		this.systemAsteroids.draw()
		this.systemCollisionParticles.draw()
		this.layer.draw()
	}

	update(delta) {
		this.systemStars.update(delta)
		this.systemAsteroids.update(delta)
		this.systemCollisionParticles.update(delta)
		this.layer.update(delta)
	}
}