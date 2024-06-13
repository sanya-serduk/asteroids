import ButtonControlPlayer from "./ButtonControlPlayer";
import RoundedPolygon from "../figures/RoundedPolygon";

export default class ButtonControlPlayerRight extends ButtonControlPlayer {
	constructor(ctx, props) {
		super(ctx, props)
		this.figure = new RoundedPolygon([
			{ x: 0, y: 0 },
			{ x: 100, y: 80 },
			{ x: 0, y: 160 },
			{ x: 60, y: 80 }
		], 10)
	}

	draw() {
		super.draw()
		this.ctx.save()
		this.ctx.translate(this.x + 3, this.y)
		this.ctx.beginPath()
		this.ctx.fillStyle = this.iconColor
		this.ctx.fill(this.figure.path2D)
		this.ctx.restore()
	}
}