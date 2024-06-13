import TEXT from "../../../constants/TEXT";
import TextButton from "../../../buttons/TextButton";
import LoadLayer from "../LoadLayer";

export default class MainMenuLayer {
	constructor(ctx, scene, { isActive = true } = {}) {
		this.ctx = ctx
		this.scene = scene
		this.isActive = isActive
		this.x = app.camera.x
		this.y = app.camera.y
		this.titleSize = 85
		this.titleFont = `${ this.titleSize }px Balsamiq Sans`
		this.titleColor = '#cac7ce'
		this.titleY = 0
		this.sectionButtons = [
			new TextButton(ctx, { text: TEXT.PLAY,           handler: () => scene.changeLayer('Game'),    isActive: this.isActive }),
			new TextButton(ctx, { text: TEXT.CONTROL,        handler: () => scene.changeLayer('Control'), isActive: this.isActive }),
			new TextButton(ctx, { text: TEXT.ABOUT_THE_GAME, handler: () => scene.changeLayer('About'),   isActive: this.isActive })
		]
		this.languageButtons = [
			new TextButton(ctx, { text: 'РУ', handler: () => this.changeLanguage('ru'), isActive: this.isActive }),
			new TextButton(ctx, { text: 'EN', handler: () => this.changeLanguage('en'), isActive: this.isActive }),
			new TextButton(ctx, { text: 'TR', handler: () => this.changeLanguage('tr'), isActive: this.isActive })
		]
		this.buttons = [ ...this.sectionButtons, ...this.languageButtons ]
		this.init()
	}

	changeLanguage(lang) {
		app.user.changeLanguage(lang)
		app.scene.addLayer('Load', LoadLayer)
		app.scene.start('Main')
		app.scene.getLayer('Load').loaded(() => app.scene.current.setActive(true))
	}

	init() {
		const paddingTitle = 80
		const paddingButtons = 20
		const top = -(this.titleSize + paddingTitle + (this.buttons[0].h + paddingButtons) * (this.sectionButtons.length+1)) / 2
		const btnTop = top + this.titleSize + paddingTitle + this.buttons[0].h/2
		this.titleY = top + this.titleSize
		this.sectionButtons.forEach((btn, i) => btn.updatePosition(0, btnTop + (this.buttons[0].h + paddingButtons) * i))
		this.languageButtons.forEach((btn, i) => btn.updatePosition(
			(this.languageButtons[0].w + paddingButtons) * i - ((this.languageButtons[0].w + paddingButtons) * (this.languageButtons.length-1) / 2),
			btnTop + (this.buttons[0].h + paddingButtons) * this.sectionButtons.length))
		this.scene.systemAsteroids.setBoost(false)
	}

	destroy() {
		this.buttons.forEach(btn => btn.destroy())
		app.cnv.style.cursor = ''
	}

	setActive(bool) {
		this.isActive = bool
		this.buttons.forEach(btn => btn.setActive(this.isActive))
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)
		this.ctx.font = this.titleFont
		this.ctx.fillStyle = this.titleColor
		const titleText = `${ TEXT.RECORD }: ${ app.user.record }`
		const textMetric = this.ctx.measureText(titleText)
		this.ctx.fillText(titleText, -textMetric.width/2, this.titleY)
		this.buttons.forEach(btn => btn.draw())
		this.ctx.restore()
	}

	update() {
		app.cnv.style.cursor = this.buttons.some(btn => btn.hover) ? 'pointer' : 'initial'
	}
}