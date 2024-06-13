import Star from "../../entities/Star";
import Helper from "../../system/Helper";

export default class StarsLayer {
	constructor(ctx) {
		this.ctx = ctx
		this.items = []
		this.minRadius = 4
		this.maxRadius = 6
		this.cell = 350
	}

	draw() {
		const cameraPosition = app.camera.position
		this.items.forEach(item => {
			if (item.star.x + item.star.r > cameraPosition.left
				&& item.star.x - item.star.r < cameraPosition.right
				&& item.star.y + item.star.r > cameraPosition.top
				&& item.star.y - item.star.r < cameraPosition.bottom) {
				item.star.draw()
			}
		})
	}

	update(delta) {
		const w2 = Math.ceil(app.camera.size.w / 2 / this.cell) * this.cell
		const h2 = Math.ceil(app.camera.size.h / 2 / this.cell) * this.cell
		const top    = app.camera.y - h2 - this.cell
		const left   = app.camera.x - w2 - this.cell
		const bottom = app.camera.y + h2
		const right  = app.camera.x + w2
		const numX = Math.round((right - left) / this.cell)
		const numY = Math.round((bottom - top) / this.cell)
		const offsetX = app.camera.x > 0 ? (app.camera.x % this.cell) - this.cell : (app.camera.x % this.cell)
		const offsetY = app.camera.y > 0 ? (app.camera.y % this.cell) - this.cell : (app.camera.y % this.cell)

		this.items = this.items.filter(item => {
			return item.x >= left
				&& item.x <= right
				&& item.y >= top
				&& item.y <= bottom
		})

		for (let i = 0; i < numX; i++) {
			const x = Math.round(left + (this.cell * i) - offsetX)

			for (let j = 0; j < numY; j++) {
				const y = Math.round(top + (this.cell * j) - offsetY)

				if (!this.items.some(item => item.x === x && item.y === y)) {
					this.items.push({
						x, y,
						star: new Star(this.ctx, {
							x: Helper.getRandomInteger(x, x + this.cell),
							y: Helper.getRandomInteger(y, y + this.cell),
							r: Helper.getRandomInteger(this.minRadius, this.maxRadius)
						})
					})
				}
			}
		}
	}
}