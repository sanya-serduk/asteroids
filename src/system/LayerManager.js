export default class LayerManager {
	constructor(ctx) {
		this.ctx = ctx
		this.current = null
		this.layers = {}
	}

	add(name, layer) {
		if (this.layers.hasOwnProperty(name)) {
			console.log(`Слой "${ name }" уже добавлен`)
			return
		}

		this.layers[name] = layer
	}

	start(name, scene, props) {
		if (!this.layers.hasOwnProperty(name)) {
			console.log(`Слой "${ name }" не найден`)
			return
		}

		if (this.current !== null && 'destroy' in this.current) {
			this.current.destroy()
		}

		this.current = new this.layers[name](this.ctx, scene, props)
	}

	remove() {
		//
	}

	draw() {
		if (this.current !== null && ('draw' in this.current)) {
			this.current.draw()
		}
	}

	update(delta) {
		if (this.current !== null && ('update' in this.current)) {
			this.current.update(delta)
		}
	}
}