export default class Localstorage {
	constructor(name, data) {
		this._name = name
		this._data = data
	}

	getData() {
		const result = {}
		const data = JSON.parse(localStorage.getItem(this._name)) || {}
		for (let key in this._data) {
			result[key] = typeof data[key] === typeof this._data[key] ? data[key] : this._data[key]
		}
		return result
	}

	setData(data) {
		const newData = {}
		const currentData = this.getData()
		for (let key in this._data) {
			newData[key] = typeof data[key] === typeof this._data[key] ? data[key] : currentData[key]
		}
		localStorage.setItem(this._name, JSON.stringify(newData))
	}
}