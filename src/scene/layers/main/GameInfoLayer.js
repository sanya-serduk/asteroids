import TEXT from "../../../constants/TEXT";
import Armor from "../../../entities/Armor";

export default class GameInfoLayer {
	constructor(ctx, player) {
		this.ctx = ctx
		this.player = player
		this.x = app.camera.x
		this.y = app.camera.y
		this.armorIcon = new Armor(ctx, 0, 0, '#96919d')
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		const textX = app.camera.size.w / 2
		const textY = app.camera.size.h / 2
		const fz = 48
		this.ctx.font = `${ fz }px Balsamiq Sans`
		this.ctx.fillStyle = '#cac7ce'
		this.ctx.fillText(`${ TEXT.SCORE }: ${ app.user.score }`, -textX + 20, -textY + fz + 10)
		this.ctx.fillStyle = '#96919d'
		this.ctx.fillText(`${ this.player.armor }%`, -textX + 85, -textY + fz * 2 + 17)
		this.armorIcon.draw()
		this.ctx.restore()
	}

	update(delta) {
		this.x = app.camera.x
		this.y = app.camera.y
		this.armorIcon.updatePosition(-(app.camera.size.w / 2) + 45, -(app.camera.size.h / 2) + 95)
	}
}