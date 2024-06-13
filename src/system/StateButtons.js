export default class StateButtons {
	constructor() {
		this.buttons = {}
		this.listeners = []
	}

	add(type, name) {
		if (this.buttons.hasOwnProperty(type)) {
			this.buttons[type][name] = 0
			return
		}

		this.buttons[type] = {}
		this.buttons[type][name] = 0
	}

	remove(type, name) {
		if (this.buttons.hasOwnProperty(type)) {
			if (this.buttons[type].hasOwnProperty(name)) {
				delete this.buttons[type][name]

				if (Object.keys(this.buttons[type]).length === 0) {
					delete this.buttons[type]
				}
			}
		}
	}

	getState(type, name) {
		if (!this.buttons.hasOwnProperty(type)) {
			console.log(`Тип "${ type }" не найден`)
			return
		}

		if (!this.buttons[type].hasOwnProperty(name)) {
			console.log(`Имя "${ name }" не найдено`)
			return
		}

		return this.buttons[type][name]
	}

	setState(type, name, state) {
		if (!this.buttons.hasOwnProperty(type)) {
			console.log(`Тип "${ type }" не найден`)
			return
		}

		if (!this.buttons[type].hasOwnProperty(name)) {
			console.log(`Имя "${ name }" не найдено`)
			return
		}

		this.buttons[type][name] = state
		this.event(type, name)
	}

	event(type, name) {
		this.listeners.forEach(listener => {
			if (listener.type === type && listener.name === name) {
				listener.handler(this.buttons[type][name])
			}
		})
	}

	on(type, name, handler) {
		this.listeners.push({ type, name, handler })
	}

	off(type, name) {
		this.listeners = this.listeners.filter(listener => listener.type !== type && listener.name !== name)
	}
}