import Localstorage from "./Localstorage";
import TEXT from "../constants/TEXT";

export default class User {
	constructor() {
		this.score = 0
		this.record = 0
		this.lang = (navigator.language || navigator.userLanguage) ?? 'ru'
		this.supportedLanguages = ['ru', 'en', 'tr']
		this.db = new Localstorage('asteroids__user', {
			record: this.record,
			lang: this.lang
		})
		this.init()
	}

	init() {
		const storageData = this.db.getData()
		this.record = storageData.record
		this.lang = storageData.lang
	}

	setStorageData() {
		this.db.setData({
			record: this.record,
			lang: this.lang
		})
	}

	upScore(num) {
		this.score += num
		if (this.score > this.record) {
			this.record = this.score
			this.setStorageData()
		}
	}

	resetScore() {
		this.score = 0
	}

	changeLanguage(lang) {
		if (this.supportedLanguages.includes(lang)) {
			this.lang = lang
			document.title = TEXT.TITLE
			this.setStorageData()
		}
	}

	endGame() {
		this.resetScore()
		this.setStorageData()
	}
}