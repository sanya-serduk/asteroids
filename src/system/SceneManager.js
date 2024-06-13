export default class SceneManager {
	constructor(ctx) {
		this.ctx = ctx
		this.current = null
		this.scenes = {}
		this.layers = []
	}

	add(name, scene) {
		if (this.scenes.hasOwnProperty(name)) {
			console.log(`Сцена "${ name }" уже добавлена`)
			return
		}

		this.scenes[name] = scene
	}

	addLayer(name, Layer) {
		if (!this.layers.find(item => item.name === name)) {
			this.layers.push({
				name, layer: new Layer(this.ctx)
			})
		}
	}

	removeLayer(name) {
		this.layers = this.layers.filter(item => item.name !== name)
	}

	getLayer(name) {
		return this.layers.find(item => item.name === name)?.layer || null
	}

	start(name, props) {
		if (!this.scenes.hasOwnProperty(name)) {
			console.log(`Сцена "${ name }" не найдена`)
			return
		}

		this.current = new this.scenes[name](this.ctx, props)
	}

	remove() {
		//
	}

	draw() {
		if (this.current !== null && ('draw' in this.current)) {
			this.current.draw()
		}

		this.layers.forEach(item => {
			if ('draw' in item.layer) {
				item.layer.draw()
			}
		})
	}

	update(delta) {
		if (this.current !== null && ('update' in this.current)) {
			this.current.update(delta)
		}

		this.layers.forEach(item => {
			if ('draw' in item.layer) {
				item.layer.update(delta)
			}
		})
	}
}