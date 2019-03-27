// Inicjuję grę dopiero po załadowaniu całej strony
window.onload = function () {
	Game.init()
}
// Obiekt, w którym będą przechowywane „podręczne” wartości
VAR = {
	fps: 60,
	W: 0,
	H: 0,
	rocksNumber: 1,
	lastTime: 0,
	lastUpdate: -1,
	rand: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
}
// Obiekt zawierający bazowe funckje związane z grą.
// Game nie ma konstruktora, jest jedynie obiektem grupującym funkcje.
Game = {
	// init zostanie odpalone raz po załadowaniu strony.
	init: function () {
		Sounds.init()
		// 
		Game.canvas = document.createElement('canvas')
		Game.hit_canvas = document.createElement('canvas')
		// 
		Game.ctx = Game.canvas.getContext('2d')
		this.hit_ctx = this.hit_canvas.getContext('2d')
		//
		Game.layout()
		// metoda layout odpali się przy każdej zmianie wielkości okna
		window.addEventListener('resize', Game.layout, false)
		//
		document.body.appendChild(Game.canvas)
		//
		Game.ship = new Ship();
		for (let i = 0; i < VAR.rocksNumber; i++) {
			new Rock()
		}
		window.addEventListener('keydown', Game.onKey, false)
		window.addEventListener('keyup', Game.onKey, false)
		//
		Game.animationLoop()
	},
	nextLevel: function () {
		window.removeEventListener('keydown', Game.onKey)
		window.removeEventListener('keyup', Game.onKey)
		let level = document.createElement('div')
		level.style.position = 'absolute'
		level.style.marginTop = '30%'
		level.style.display = 'grid'
		level.style.alignContent = 'space-around'
		level.style.width = '100%'
		level.style.height = '70px'
		level.style.backgroundColor = '#0c0e0e'
		level.style.fontSize = '50px'
		level.style.textAlign = 'center'
		level.style.color = 'white'
		level.innerText = 'Congratulation!!!'
		document.body.appendChild(level)
	},
	stop: function () {
		window.removeEventListener('keydown', Game.onKey)
		window.removeEventListener('keyup', Game.onKey)
		let div = document.createElement('div')
		div.className = 'game_over'
		div.style.position = 'absolute'
		div.style.marginTop = '30%'
		div.style.display = 'grid'
		div.style.alignContent = 'space-around'
		div.style.width = '100%'
		div.style.backgroundColor = '#0c0e0e'
		div.style.fontSize = '50px'
		div.style.textAlign = 'center'
		div.style.color = 'white'
		div.innerText = 'Game Over \n  Your Score: ' + Rock.score + '\n Click to play again'

		document.body.appendChild(div)
		window.addEventListener('click', function () { document.location.reload(true) })

	},
	onKey: function (event) {
		console.log(event.keyCode)
		if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 32) {

			if (event.type == 'keydown' && !Game['key_' + event.keyCode]) {

				Game['key_' + event.keyCode] = true;
				if (event.keyCode == 37) {
					Game.key_39 = false
				} else if (event.keyCode == 39) {
					Game.key_37 = false
				} else if (event.keyCode == 32) {
					new Bullet()
				}
			} else if (event.type == 'keyup') {
				Game['key_' + event.keyCode] = false
			}
		}

	},
	// Ta metoda będzie odpalana przy każdej zmianie wielkości okna
	layout: function (ev) {
		// 
		VAR.W = window.innerWidth
		VAR.H = window.innerHeight
		// 
		VAR.d = Math.min(VAR.W, VAR.H)
		// Update wielkości canvas
		Game.canvas.width = VAR.W
		Game.canvas.height = VAR.H
		//
		Game.hit_canvas.width = VAR.W
		Game.hit_canvas.height = VAR.H
		Game.hit_ctx.fillStyle = 'red'
		//
		Game.ctx.fillStyle = 'white'
		Game.ctx.strokeStyle = 'white'
		Game.ctx.lineWidth = 3
		Game.ctx.lineJoin = 'round'
		//
		Game.hit_canvas.width = VAR.W
		Game.hit_canvas.height = VAR.H
		//

		Game.hit_ctx.fillStyle = '#ff0000'
	},
	// fps = 60
	animationLoop: function (time) {
		requestAnimationFrame(Game.animationLoop)
		// ograniczenie do ilości klatek zdefiniowanych w właściwości obiektu VAR 
		if (time - VAR.lastTime >= 1000 / VAR.fps) {
			VAR.lastTime = time
			//
			Game.ctx.clearRect(0, 0, VAR.W, VAR.H)
			// 
			Game.ship.draw()
			Bullet.draw()
			Rock.draw()
			Dot.draw()
		}
	}
}