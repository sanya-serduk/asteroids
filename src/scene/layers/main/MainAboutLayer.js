import TextButton from "../../../buttons/TextButton";
import TEXT from "../../../constants/TEXT";

export default class MainAboutLayer {
	constructor(ctx, scene) {
		this.ctx = ctx
		this.x = app.camera.x
		this.y = app.camera.y
		this.titleSize = 85
		this.titleFont = `${ this.titleSize }px Balsamiq Sans`
		this.titleColor = '#cac7ce'
		this.textSize = 45
		this.textFont = `${ this.textSize }px Balsamiq Sans`
		this.textColor = '#cac7ce'
		this.titlePadding = 60
		this.textLinePadding = 20
		this.textBlockPadding = 60
		this.textBlockX = 0
		this.textBlockY = 0
		this.title = TEXT.ABOUT_THE_GAME
		this.text = TEXT.ABOUT_THE_GAME_DESCRIPTION
		this.btnBack = new TextButton(ctx, {
			text: TEXT.BACK,
			handler: () => scene.changeLayer('Menu')
		})
		this.init()
	}

	init() {
		const { titleSize, titleFont, textSize, textFont, titlePadding, textLinePadding, textBlockPadding, textBlocks } = this
		let y = this.btnBack.h + titleSize + titlePadding + textBlockPadding

		this.ctx.font = titleFont
		this.textBlockX = Math.min(-this.ctx.measureText(this.title).width/2, this.textBlockX)

		this.text.split('\n').forEach(line => {
			this.ctx.font = textFont
			this.textBlockX = Math.min(-this.ctx.measureText(line).width/2, this.textBlockX)
			y += textSize + textLinePadding
		})

		this.textBlockY = -(y/2) + titleSize/2
		this.btnBack.updatePosition(0, y/2 - this.btnBack.h/2 + titleSize/2)
	}

	destroy() {
		this.btnBack.destroy()
		app.cnv.style.cursor = ''
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		this.ctx.font = this.titleFont
		this.ctx.fillStyle = this.titleColor
		this.ctx.fillText(this.title, -this.ctx.measureText(this.title).width/2, this.textBlockY)

		let textLineCounter = 0
		const lines = this.text.split('\n')
		this.ctx.font = this.textFont
		this.ctx.fillStyle = this.textColor

		lines.forEach(line => {
			this.ctx.fillText(
				line,
				this.textBlockX,
				this.textBlockY + this.titleSize + this.titlePadding + (this.textSize * textLineCounter) + (this.textLinePadding * textLineCounter)
			)
			textLineCounter++
		})

		this.btnBack.draw()
		this.ctx.restore()
	}

	update(delta) {
		app.cnv.style.cursor = this.btnBack.hover ? 'pointer' : 'initial'
	}
}