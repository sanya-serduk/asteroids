import TEXT from "../../../constants/TEXT";
import TextButton from "../../../buttons/TextButton";

export default class GameOverLayer {
	constructor(ctx, scene, score) {
		this.ctx = ctx
		this.x = app.camera.x
		this.y = app.camera.y
		this.score = score || 0
		this.titleSize = 85
		this.titleText = app.user.record === this.score ? `${ TEXT.NEW_RECORD }: ${ app.user.record }` : `${ TEXT.SCORE }: ${ this.score }`
		this.titleFont = `${ this.titleSize }px Balsamiq Sans`
		this.titleColor = '#cac7ce'
		this.titleY = 0
		this.btnReload = new TextButton(ctx, { text: TEXT.AGAIN, handler: () => scene.changeLayer('Game') })
		this.btnHome   = new TextButton(ctx, { text: TEXT.EXIT,  handler: () => scene.changeLayer('Menu') })
		this.init()
	}

	init() {
		const paddingTitle = 80
		const paddingButtons = 20
		const top = -(this.titleSize + paddingTitle + (this.btnReload.h + paddingButtons) * 2) / 2
		const btnTop = top + this.titleSize + paddingTitle + this.btnReload.h/2
		this.titleY = top + this.titleSize
		this.btnReload.updatePosition(0, btnTop)
		this.btnHome.updatePosition(0, btnTop + this.btnReload.h + paddingButtons)
	}

	destroy() {
		this.btnReload.destroy()
		this.btnHome.destroy()
		app.cnv.style.cursor = ''
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.font = this.titleFont
		this.ctx.fillStyle = this.titleColor
		const textMetric = this.ctx.measureText(this.titleText)
		this.ctx.fillText(this.titleText, -textMetric.width/2, this.titleY)
		this.btnReload.draw()
		this.btnHome.draw()
		this.ctx.restore()
	}

	update() {
		app.cnv.style.cursor = [this.btnReload, this.btnHome].some(btn => btn.hover) ? 'pointer' : 'initial'
	}
}