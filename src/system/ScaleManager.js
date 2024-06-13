export default class ScaleManager {
	constructor(cnv, w, h) {
		this.cnv = cnv
		this.originSize = { w, h }
		this.currentSize = { w, h }
		this.scale = 1
		this.init()
	}

	init() {
		window.addEventListener('resize', this.update.bind(this))
		this.update()
	}

	get size() {
		return this.currentSize
	}

	update() {
		this.scale = Math.min(document.documentElement.clientWidth / this.originSize.w, document.documentElement.clientHeight / this.originSize.h)
		this.cnv.width = this.originSize.w * this.scale
		this.cnv.height = this.originSize.h * this.scale
		this.currentSize.w = this.cnv.width / this.scale
		this.currentSize.h = this.cnv.height / this.scale
	}
}