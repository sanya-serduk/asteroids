import ButtonControlPlayerUp from "../../../buttons/ButtonControlPlayerUp";
import ButtonControlPlayerDown from "../../../buttons/ButtonControlPlayerDown";
import ButtonControlPlayerLeft from "../../../buttons/ButtonControlPlayerLeft";
import ButtonControlPlayerRight from "../../../buttons/ButtonControlPlayerRight";
import ButtonControlPlayerFire from "../../../buttons/ButtonControlPlayerFire";

export default class GameControlPanelLayer {
	constructor(ctx) {
		this.ctx = ctx
		this.x = app.camera.x
		this.y = app.camera.y
		this.typeButtons = 'player_control'
		this.buttons = {
			up:    new ButtonControlPlayerUp(ctx,    { x:this.x, y:this.y, type: this.typeButtons, name: 'up' }),
			down:  new ButtonControlPlayerDown(ctx,  { x:this.x, y:this.y, type: this.typeButtons, name: 'down', r: 90 }),
			left:  new ButtonControlPlayerLeft(ctx,  { x:this.x, y:this.y, type: this.typeButtons, name: 'left' }),
			right: new ButtonControlPlayerRight(ctx, { x:this.x, y:this.y, type: this.typeButtons, name: 'right' }),
			fire:  new ButtonControlPlayerFire(ctx,  { x:this.x, y:this.y, type: this.typeButtons, name: 'fire' })
		}
		this.init()
	}

	init() {
		for (const key in this.buttons) {
			app.stateButtons.add(this.typeButtons, key)
		}
	}

	destroy() {
		for (const key in this.buttons) {
			this.buttons[key].destroy()
			app.stateButtons.remove(this.typeButtons, key)
		}
	}

	draw() {
		this.ctx.save()
		this.ctx.translate(this.x, this.y)

		for (const key in this.buttons) {
			this.buttons[key].draw()
		}

		this.ctx.restore()
	}

	update(delta) {
		const cameraW2 = app.camera.size.w / 2
		const cameraH2 = app.camera.size.h / 2
		this.x = app.camera.x
		this.y = app.camera.y
		this.buttons.up.updatePosition(cameraW2 - 300, cameraH2 - 120)
		this.buttons.fire.updatePosition(cameraW2 - 120, cameraH2 - 300)
		this.buttons.down.updatePosition(cameraW2 - 520, cameraH2 - 90)
		this.buttons.left.updatePosition(-cameraW2 + 120, cameraH2 - 300)
		this.buttons.right.updatePosition(-cameraW2 + 300, cameraH2 - 120)
	}
}