import Ticker from "./system/Ticker";
import Camera from "./system/Camera";
import Keyboard from "./system/Keyboard";
import SceneManager from "./system/SceneManager";
import ScaleManager from "./system/ScaleManager";
import User from "./system/User";
import StateButtons from "./system/StateButtons";

export default class App {
	constructor(cnv) {
		this.cnv = cnv
		this.ctx = cnv.getContext("2d")
		this.scaleManager = new ScaleManager(cnv, 1920, 1080)
		this.ticker = new Ticker()
		this.camera = new Camera(this.size)
		this.keyboard = new Keyboard()
		this.scene = new SceneManager(this.ctx)
		this.user = new User()
		this.stateButtons = new StateButtons()
		this.init()
	}

	init() {
		this.ticker.add('app-update', this.update.bind(this))
	}

	get scale() {
		return this.scaleManager.scale
	}

	get size() {
		return this.scaleManager.size
	}

	update(delta) {
		this.scene.update(delta)
		this.ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0)
		this.ctx.clearRect(0, 0, this.size.w, this.size.h)
		this.ctx.translate(this.size.w / 2 - app.camera.x, this.size.h / 2 - app.camera.y)
		this.scene.draw()
	}
}