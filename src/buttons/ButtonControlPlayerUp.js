import ButtonControlPlayer from "./ButtonControlPlayer";
import RoundedPolygon from "../figures/RoundedPolygon";

export default class ButtonControlPlayerUp extends ButtonControlPlayer {
	constructor(ctx, props) {
		super(ctx, props)
		this.figure = new RoundedPolygon([
			{ x: 0, y: 100 },
			{ x: 80, y: 0 },
			{ x: 160, y: 100 },
			{ x: 80, y: 40 }
		], 10)
	}

	draw() {
		super.draw()
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		this.ctx.beginPath()
		this.ctx.fillStyle = this.iconColor
		this.ctx.fill(this.figure.path2D)

		this.ctx.restore()
	}
}