export default class Ticker {
	constructor() {
		this.updates = []
		this.fps = 60
		this.raf = null
		this.prevTimestamp = null
		this.listener = this.update.bind(this)
	}

	start() {
		this.prevTimestamp = null
		this.raf = requestAnimationFrame(this.listener)
	}

	stop() {
		cancelAnimationFrame(this.listener)
		this.raf = null
	}

	add(name, callback) {
		if (this.checkName(name)) {
			return
		}

		this.updates.push({ name, callback })

		if (this.raf === null) {
			this.start()
		}
	}

	remove(name) {
		const index = this.updates.findIndex(update => update.name === name)

		if (index === -1) {
			return
		}

		this.updates.splice(index, 1)
	}

	checkName(name) {
		return this.updates.findIndex(update => update.name === name) !== -1
	}

	update(timestamp) {
		if (!this.updates.length) {
			this.stop()
			return
		}

		const delta = this.prevTimestamp === null ? 1 : (timestamp - this.prevTimestamp) * this.fps / 1000
		this.prevTimestamp = timestamp
		this.updates.forEach(update => update.callback(delta))
		this.raf = requestAnimationFrame(this.listener)
	}
}