export default class TimerArtefact {
	constructor(startTime = 10, step = 10) {
		this.current = startTime
		this.timeout = startTime
		this.step = step
	}

	get time() {
		return this.current
	}

	update() {
		this.current -= 1
	}

	reset() {
		this.timeout += this.step
		this.current = this.timeout
	}
}