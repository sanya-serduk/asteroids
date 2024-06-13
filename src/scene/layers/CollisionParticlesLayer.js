import Helper from "../../system/Helper";
import CollisionParticle from "../../entities/CollisionParticle";

export default class CollisionParticlesLayer {
	constructor(ctx) {
		this.ctx = ctx
		this.particles = []
	}

	create(x, y, w, h, color) {
		const num = Math.round((w * h) / (60 * 60)) * 3
		const offsetX = w/3
		const offsetY = h/3
		for (let i = 0; i < num; i++) {
			this.particles.push(new CollisionParticle(
				this.ctx,
				Helper.getRandomInteger(x - offsetX, x + offsetX),
				Helper.getRandomInteger(y - offsetY, y + offsetY),
				color
			))
		}
	}

	draw() {
		const cameraPosition = app.camera.position
		this.particles.forEach(particle => {
			if (!particle.destroyed
				&& particle.x + particle.r > cameraPosition.left
				&& particle.x - particle.r < cameraPosition.right
				&& particle.y + particle.r > cameraPosition.top
				&& particle.y - particle.r < cameraPosition.bottom) {
				particle.draw()
			}
		})
	}

	update(delta) {
		this.particles = this.particles.filter(particle => {
			if (particle.destroyed) {
				return false
			}

			particle.update(delta)
			return true
		})
	}
}