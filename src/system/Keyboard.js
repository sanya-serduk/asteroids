export default class Keyboard {
	constructor() {
		this.keys = {}
		this.codes = {}
		this.events = [
			{ name: 'keyup',       handler: this.keyUp.bind(this) },
			{ name: 'keydown',     handler: this.keyDown.bind(this) },
			{ name: 'blur',        handler: this.resetKeys.bind(this) },
			{ name: 'contextmenu', handler: this.resetKeys.bind(this) },
		]

		this.init()
	}

	init() {
		this.add('up',    ['KeyW', 'ArrowUp'])
		this.add('down',  ['KeyS', 'ArrowDown'])
		this.add('left',  ['KeyA', 'ArrowLeft'])
		this.add('right', ['KeyD', 'ArrowRight'])
		this.events.forEach(e => window.addEventListener(e.name, e.handler))
	}

	destroy() {
		this.keys = {}
		this.codes = {}
		this.events.forEach(e => window.removeEventListener(e.name, e.handler))
	}

	add(name, codes) {
		codes.forEach(code => {
			if (!this.codes.hasOwnProperty(code)) {
				this.keys[name] = 0
				this.codes[code] = name
			}
		})
	}

	remove(name) {
		if (!this.keys.hasOwnProperty(name)) {
			return
		}

		for (const code in this.codes) {
			if (this.codes[code] === name) {
				delete this.codes[code]
			}
		}

		delete this.keys[name]
	}

	getState(name) {
		return this.keys[name]
	}

	setState(code, state) {
		if (!this.codes.hasOwnProperty(code)) {
			return
		}

		this.keys[this.codes[code]] = state
	}

	keyUp(e) {
		this.setState(e.code, 0)
	}

	keyDown(e) {
		this.setState(e.code, 1)
	}

	resetKeys() {
		for (const code in this.codes) {
			this.setState(code, 0)
		}
	}
}