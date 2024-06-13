import Helper from "./Helper";

export default class Driving {
	constructor(speed) {
		this.speedMax = speed
		this.rotateMax = Math.PI/45
		this.speed  = { up: 0, down: 0, step: 0.2, max: this.speedMax }
		this.rotate = { current: 0, left: 0, right: 0, step: Math.PI/500, max: this.rotateMax, direction: 0, turnDirection: 0 }
	}

	getMove(up, down, rotation, delta) {
		const { speed, speedMax } = this
		speed.up += up ? Math.min(speedMax - speed.up, speed.step) : -Math.min(speed.up, speed.step * delta)
		speed.down += down ? Math.min(speedMax - speed.down, speed.step) : -Math.min(speed.down, speed.step * delta)

		return Helper.velocity({
			x : (speed.up   * Math.sin(rotation) - speed.down * Math.sin(rotation)),
			y : (speed.down * Math.cos(rotation) - speed.up   * Math.cos(rotation))
		}, this.speed )
	}

	getRotation(down, left, right, delta) {
		const { rotate } = this
		const direction = down ? 0 : 1
		const stepLeft = left ? Math.min(rotate.max - rotate.left, rotate.step) : -Math.min(rotate.left, rotate.step * delta)
		const stepRight = right ? Math.min(rotate.max - rotate.right, rotate.step) : -Math.min(rotate.right, rotate.step * delta)

		if (direction === rotate.direction) {
			rotate.left += stepLeft
			rotate.right += stepRight
		} else {
			if (rotate.left === 0 && rotate.right === 0) {
				rotate.left += stepLeft
				rotate.right += stepRight
				rotate.direction = direction
			} else {
				rotate.left = Math.max(rotate.left - rotate.step, 0)
				rotate.right = Math.max(rotate.right - rotate.step, 0)
				return direction ? (rotate.left - rotate.right) : (rotate.right - rotate.left)
			}
		}

		return !direction ? (rotate.left - rotate.right) : (rotate.right - rotate.left)
	}

	getRotationCurrent() {
		return this.rotate.right - this.rotate.left
	}
	getRotationDirection() {
		return Math.abs(this.rotate.left) > Math.abs(this.rotate.right) ? 'left' : 'right'
	}
	getSpeedCurrent() {
		return Math.abs(this.speed.up - this.speed.down)
	}
	getSpeedDirection() {
		return Math.abs(this.speed.up) > Math.abs(this.speed.down) ? 'up' : 'down'
	}
}