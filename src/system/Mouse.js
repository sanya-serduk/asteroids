export default class Mouse {
	constructor(cnv) {
		this.x = 0
		this.y = 0
		cnv.addEventListener('mousedown', this.listener.bind(this))
		cnv.addEventListener('mousemove', this.listener.bind(this))
		cnv.addEventListener('touchstart', this.listener.bind(this))
	}

	get screen() {
		const { scale, size } = app
		return {
			x: this.x / scale - (size.w / 2),
			y: this.y / scale - (size.h / 2)
		}
	}

	get camera() {
		const { scale, size, camera } = app
		return {
			x: this.x / scale - (size.w / 2 - camera.x),
			y: this.y / scale - (size.h / 2 - camera.y)
		}
	}

	listener(e) {
		this.x = e.offsetX
		this.y = e.offsetY
	}
}