import TextButton from "../../../buttons/TextButton";
import TEXT from "../../../constants/TEXT";

export default class MainControlLayer {
	constructor(ctx, scene) {
		this.ctx = ctx
		this.x = app.camera.x
		this.y = app.camera.y

		this.title = TEXT.CONTROL
		this.titleSize = 85
		this.titlePadding = 60
		this.titleFont = `${ this.titleSize }px Balsamiq Sans`
		this.titleColor = '#cac7ce'

		this.subTitleSize = 50
		this.subTitlePadding = 10
		this.subTitleFont = `${ this.subTitleSize }px Balsamiq Sans`
		this.subTitleColor = '#cac7ce'

		this.textSize = 45
		this.textLinePadding = 20
		this.textFont = `${ this.textSize }px Balsamiq Sans`
		this.textColor = '#cac7ce'

		this.textBlockPadding = 60
		this.textBlockX = 0
		this.textBlockY = 0
		this.textBlocks = [
			{ title: TEXT.CONTROL_FROM_PC.TITLE,     items: TEXT.CONTROL_FROM_PC.ITEMS },
			{ title: TEXT.CONTROL_FROM_MOBILE.TITLE, items: TEXT.CONTROL_FROM_MOBILE.ITEMS }
		]
		this.btnBack = new TextButton(ctx, {
			text: TEXT.BACK,
			handler: () => scene.changeLayer('Menu')
		})
		this.init()
	}

	init() {
		const {
			title, textBlocks,
			titleSize, subTitleSize, textSize,
			titleFont, subTitleFont, textFont,
			titlePadding, subTitlePadding, textLinePadding, textBlockPadding
		} = this

		let y = this.btnBack.h + titleSize + titlePadding
		this.ctx.font = titleFont
		this.textBlockX = Math.min(-this.ctx.measureText(title).width/2, this.textBlockX)

		textBlocks.forEach((block, i) => {
			this.ctx.font = subTitleFont
			this.textBlockX = Math.min(-this.ctx.measureText(block.title).width/2, this.textBlockX)
			y += subTitleSize + subTitlePadding + textBlockPadding

			block.items.forEach(item => {
				item.split('\n').forEach(line => {
					this.ctx.font = textFont
					this.textBlockX = Math.min(-this.ctx.measureText(line).width/2, this.textBlockX)
					y += textSize + textLinePadding
				})
			})
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

		let titleCounter = 0
		let textLineCounter = 0
		let textBlockCounter = 0

		const getTextY = () => {
			return this.textBlockY
				+ this.titleSize
				+ this.titlePadding
				+ (this.subTitleSize * titleCounter)
				+ (this.subTitlePadding * titleCounter)
				+ (this.textSize * textLineCounter)
				+ (this.textLinePadding * textLineCounter)
				+ (this.textBlockPadding * textBlockCounter)
		}

		this.textBlocks.forEach(block => {
			this.ctx.font = this.subTitleFont
			this.ctx.fillStyle = this.subTitleColor
			this.ctx.fillText(block.title, this.textBlockX, getTextY())
			titleCounter++

			block.items.forEach(item => {
				const lines = item.split('\n')
				this.ctx.font = this.textFont
				this.ctx.fillStyle = this.textColor

				lines.forEach(line => {
					this.ctx.fillText(line, this.textBlockX, getTextY())
					textLineCounter++
				})
			})

			textBlockCounter++
		})


		this.btnBack.draw()
		this.ctx.restore()
	}

	update(delta) {
		app.cnv.style.cursor = this.btnBack.hover ? 'pointer' : 'initial'
	}
}