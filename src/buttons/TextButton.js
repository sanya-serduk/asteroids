export default class TextButton {
	constructor(ctx, props) {
		this.ctx = ctx
		this.x = props.x || 0
		this.y = props.y || 0
		this.isActive = props.isActive ?? true
		this.fz = 52
		this.w = 0
		this.h = this.fz * 2 + 20
		this.text = `${ props.text || 'button' }`
		this.font = `${ this.fz }px Balsamiq Sans`
		this.hover = 0
		this.handler = props.handler || (() => {})
		this.clickHandler = this.click.bind(this)
		this.mousemoveHandler = this.mousemove.bind(this)
		this.isActive = props.isActive ?? true
		this.init()

		if (this.isActive) {
			this.addListeners()
		}
	}

	init() {
		this.ctx.save()
		this.ctx.font = this.font
		const textMetric = this.ctx.measureText(this.text)
		this.w = textMetric.width + this.h
		this.ctx.restore()
	}

	destroy() {
		this.removeListeners()
	}

	setActive(bool) {
		this.isActive = bool
		this.isActive ? this.addListeners() : this.removeListeners()
	}

	addListeners() {
		app.cnv.addEventListener('click', this.clickHandler)
		app.cnv.addEventListener('mousemove', this.mousemoveHandler)
	}

	removeListeners() {
		app.cnv.removeEventListener('click', this.clickHandler)
		app.cnv.removeEventListener('mousemove', this.mousemoveHandler)
		this.hover = 0
	}

	click(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.left) / app.scale - (app.size.w / 2)
		const y = (e.clientY - b.top) / app.scale - (app.size.h / 2)
		if (x > this.x - this.w/2
			&& x < this.x + this.w/2
			&& y > this.y - this.h/2
			&& y < this.y + this.h/2) {
			this.handler()
		}
	}

	mousemove(e) {
		const b = app.cnv.getBoundingClientRect()
		const x = (e.clientX - b.x) / app.scale - (app.size.w / 2)
		const y = (e.clientY - b.y) / app.scale - (app.size.h / 2)
		this.hover = x > this.x - this.w/2
			&& x < this.x + this.w/2
			&& y > this.y - this.h/2
			&& y < this.y + this.h/2
	}

	updatePosition(x, y) {
		this.x = x
		this.y = y
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		this.ctx.beginPath()
		this.ctx.fillStyle = `rgba(173, 154, 194, ${ this.hover ? 0.1 : 0.05 })`
		this.ctx.arc(-this.w/2+this.h/2, 0, this.h/2, Math.PI/2, -Math.PI/2)
		this.ctx.arc(this.w/2-this.h/2, 0, this.h/2, -Math.PI/2, Math.PI/2)
		this.ctx.fill()

		this.ctx.fillStyle = 'rgb(202,199,206)'
		this.ctx.font = this.font
		this.ctx.fillText(this.text, -this.w/2+this.h/2, 18)

		this.ctx.restore()
	}
}