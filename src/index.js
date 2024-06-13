import './index.css'
import App from "./App";
import Main from "./scene/Main";
import LoadLayer from "./scene/layers/LoadLayer";

const cnv = document.getElementById('cnv')
window.app = new App(cnv)
app.scene.add('Main', Main)
app.scene.addLayer('Load', LoadLayer)

function startGame() {
	app.scene.start('Main')
	app.scene.getLayer('Load').loaded(() => app.scene.current.setActive(true))
}

async function loadFont() {
	try {
		const font = new FontFace("Balsamiq Sans", "url(./assets/fonts/BalsamiqSans-Regular.ttf)")
		await font.load()
		document.fonts.add(font)
	} catch (e) {
		console.error(e)
	}
}

function fullscreenInit() {
	const btn = document.getElementById('btnFullscreen')
	window.addEventListener('click', windowClickHandler, { once: true })
	window.addEventListener('fullscreenchange', windowFullscreenChangeHandler)

	function windowClickHandler() {
		fullscreenOn()
		btn.addEventListener('click', fullscreenToggle)
	}

	function windowFullscreenChangeHandler() {
		!document.fullscreenElement ? btn.classList.remove('active') : btn.classList.add('active')
	}

	function fullscreenToggle() {
		!document.fullscreenElement ? fullscreenOn() : fullscreenOff()
	}

	function fullscreenOn() {
		document.documentElement.requestFullscreen()
		btn.classList.add('active')
	}

	function fullscreenOff() {
		document.exitFullscreen()
		btn.classList.remove('active')
	}
}

(async function() {
	fullscreenInit()
	await loadFont()
	startGame()
})()