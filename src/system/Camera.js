export default class Camera {
	constructor() {
		this._x = 0
		this._y = 0
		this.object = null
	}

	get x() {
		if (this.hasFollow) {
			this._x = this.object.x
		}

		return this._x;
	}

	get y() {
		if (this.hasFollow) {
			this._y = this.object.y
		}

		return this._y;
	}

	get position() {
		const appSize = app.size;
		return {
			top:    this.y - appSize.h / 2,
			right:  this.x + appSize.w / 2,
			bottom: this.y + appSize.h / 2,
			left:   this.x - appSize.w / 2,
		};
	}

	get size() {
		return { ...app.size }
	}

	get hasFollow() {
		return this.object !== null
	}

	follow(object) {
		this.object = object;
	}

	unFollow() {
		this.object = null
	}

	reset() {
		this._x = 0
		this._y = 0
	}
}