import Helper from "../system/Helper";

export default class ButtonControlPlayer {
	constructor(ctx, { x, y, r, name, type }) {
		this.ctx = ctx
		this.type = type || 'player_control'
		this.name = name || 'player_control'
		this.x = x
		this.y = y
		this.r = r || 120
		this.state = 0
		this.touchID = null
		this.iconColor = `rgba(150, 145, 157, 0.7)`
		this.handlerTouchStart = this.touchStart.bind(this)
		this.handlerTouchEnd = this.touchEnd.bind(this)
		this.init()
	}

	init() {
		app.cnv.addEventListener('touchstart', this.handlerTouchStart)
		app.cnv.addEventListener('touchend', this.handlerTouchEnd)
	}

	destroy() {
		app.cnv.removeEventListener('touchstart', this.handlerTouchStart)
		app.cnv.removeEventListener('touchend', this.handlerTouchEnd)
	}

	setState(state) {
		this.state = state
		app.stateButtons.setState(this.type, this.name, state)
	}

	touchStart(e) {
		if (this.touchID !== null) {
			return
		}

		const b = app.cnv.getBoundingClientRect()

		for (const key in e.touches) {
			const x = (e.touches[key].clientX - b.left) / app.scale - (app.size.w / 2)
			const y = (e.touches[key].clientY - b.top) / app.scale - (app.size.h / 2)
			const dist = Helper.distance({ x:this.x, y: this.y }, { x, y })
			if (dist <= this.r) {
				this.setState(1)
				this.touchID = e.touches[key].identifier
				return
			}
		}
	}

	touchEnd(e) {
		for (const key in e.changedTouches) {
			if (e.changedTouches[key].identifier === this.touchID) {
				this.setState(0)
				this.touchID = null
				return
			}
		}
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.beginPath()
		this.ctx.fillStyle = `rgba(173, 154, 194, ${ this.state ? 0.1 : 0.05 })`
		this.ctx.arc(0, 0, this.r-20, 0, Math.PI*2)
		this.ctx.fill()
		this.ctx.restore()
	}

	updatePosition(x, y) {
		this.x = x
		this.y = y
	}
}