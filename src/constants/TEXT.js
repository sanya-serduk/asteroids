function langFormat(lang, obj) {
	return obj.hasOwnProperty(lang) ? obj[lang] : obj[obj.default]
}

export default {
	get TITLE() {
		return langFormat(app.user.lang, {
			ru: 'Астероиды',
			en: 'Asteroids',
			tr: 'Asteroitler',
			default: 'ru'
		})
	},

	get SCORE() {
		return langFormat(app.user.lang, {
			ru: 'Счёт',
			en: 'Score',
			tr: 'Hesap',
			default: 'ru'
		})
	},

	get RECORD() {
		return langFormat(app.user.lang, {
			ru: 'Рекорд',
			en: 'Record',
			tr: 'Rekor',
			default: 'ru'
		})
	},

	get NEW_RECORD() {
		return langFormat(app.user.lang, {
			ru: 'Новый рекорд',
			en: 'New record',
			tr: 'Yeni rekor',
			default: 'ru'
		})
	},

	get PLAY() {
		return langFormat(app.user.lang, {
			ru: 'Играть',
			en: 'Play',
			tr: 'Oynamak',
			default: 'ru'
		})
	},

	get BACK() {
		return langFormat(app.user.lang, {
			ru: 'Назад',
			en: 'Back',
			tr: 'Geri',
			default: 'ru'
		})
	},

	get CONTROL() {
		return langFormat(app.user.lang, {
			ru: 'Управление',
			en: 'Control',
			tr: 'Yönetim',
			default: 'ru'
		})
	},

	get ABOUT_THE_GAME() {
		return langFormat(app.user.lang, {
			ru: 'Об игре',
			en: 'About the game',
			tr: 'Oyun hakkında',
			default: 'ru'
		})
	},

	get ABOUT_THE_GAME_DESCRIPTION() {
		return langFormat(app.user.lang, {
			ru: 'Вам предстоит управлять космическим кораблем и сражаться с бесконечным\n' +
				'потоком астероидов. Используйте щиты, которые выпадают из астероидов,\n' +
				'для защиты своего корабля от разрушительных столкновений.\n' +
				'\n' +
				'Главная цель — собрать как можно больше очков и подняться на вершину\n' +
				'таблицы лидеров',
			en: 'You have to control a spaceship and fight an endless stream of asteroids.\n' +
				'Use shields that fall out of asteroids, to protect your ship from\n' +
				'destructive collisions.\n' +
				'\n' +
				'The main goal is to collect as many points as possible and climb to the top\n' +
				'of the leaderboard',
			tr: 'Bir uzay gemisini kontrol etmeli ve sonsuz bir asteroit akışıyla\n' +
				'savaşmalısınız. Geminizi yıkıcı çarpışmalardan korumak için asteroitlerden\n' +
				'düşen kalkanları kullanın.\n' +
				'\n' +
				'Asıl amaç mümkün olduğunca çok puan toplamak ve skor tablosunun tepesine\n' +
				'tırmanmaktır',
			default: 'ru'
		})
	},

	get AGAIN() {
		return langFormat(app.user.lang, {
			ru: 'Заново',
			en: 'Again',
			tr: 'Yeniden',
			default: 'ru'
		})
	},

	get EXIT() {
		return langFormat(app.user.lang, {
			ru: 'Выход',
			en: 'Exit',
			tr: 'Çıkış',
			default: 'ru'
		})
	},

	get CONTROL_FROM_PC() {
		return {
			TITLE: langFormat(app.user.lang, {
				ru: 'Управление с ПК:',
				en: 'Control from a PC:',
				tr: 'PC\'den kontrol:',
				default: 'ru'
			}),
			ITEMS: [
				langFormat(app.user.lang, {
					ru: '- Для движения используйте клавиши WASD или стрелки на клавиатуре',
					en: '- To move, use the WASD keys or the arrows on the keyboard',
					tr: '- Hareket etmek için klavyenizdeki WASD tuşlarını veya ok tuşlarını\n' +
						'  kullanın',
					default: 'ru'
				}),
				langFormat(app.user.lang, {
					ru: '- Для стрельбы нажимайте или удерживайте левую кнопку мыши в любой\n' +
						'  точке игрового поля',
					en: '- To shoot, press or hold the left mouse button at any the point\n' +
						'  of the playing field',
					tr: '- Ateş etmek için, oyun alanının herhangi bir yerinde sol fare\n' +
						'  düğmesini basılı tutun veya basılı tutun',
					default: 'ru'
				})
			]
		}
	},

	get CONTROL_FROM_MOBILE() {
		return {
			TITLE: langFormat(app.user.lang, {
				ru: 'Управление с мобильного:',
				en: 'Mobile control:',
				tr: 'Mobil cihazdan kontrol:',
				default: 'ru'
			}),
			ITEMS: [
				langFormat(app.user.lang, {
					ru: '- Для движения используйте экранные кнопки в форме стрелок',
					en: '- To move, use the on-screen buttons in the form of arrows',
					tr: '- Hareket etmek için ok şeklindeki ekran düğmelerini kullanın',
					default: 'ru'
				}),
				langFormat(app.user.lang, {
					ru: '- Для стрельбы нажимайте или удерживайте экранную кнопку "прицел"',
					en: '- To shoot, press or hold the on-screen "sight" button',
					tr: '- Ateş etmek için ekrandaki "görme" düğmesine basın veya basılı tutun',
					default: 'ru'
				})
			]
		}
	}
}