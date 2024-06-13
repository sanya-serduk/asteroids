import ButtonControlPlayer from "./ButtonControlPlayer";
import RoundedPolygon from "../figures/RoundedPolygon";

export default class ButtonControlPlayerDown extends ButtonControlPlayer {
	constructor(ctx, props) {
		super(ctx, props)
		this.figure = new RoundedPolygon([
			{ x: 0, y: 0 },
			{ x: 50, y: 30 },
			{ x: 100, y: 0 },
			{ x: 50, y: 50 }
		], 5)
	}

	draw() {
		super.draw()
		this.ctx.save()
		this.ctx.translate(this.x, this.y+5)

		this.ctx.beginPath()
		this.ctx.fillStyle = this.iconColor
		this.ctx.fill(this.figure.path2D)

		this.ctx.restore()
	}
}