// Inicjuję grę dopiero po załadowaniu całej strony
window.onload = function () {
	Game.init();
}
// Obiekt, w którym będą przechowywane „podręczne” wartości
VAR = {
	fps: 60,
	W: 0,
	H: 0,
	lastTime: 0,
	lastUpdate: -1,
	rand: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
// Obiekt zawierający bazowe funckje związane z grą.
// Game nie ma konstruktora, jest jedynie obiektem grupującym funkcje.
Game = {
	// init zostanie odpalone raz po załadowaniu strony.
	init: function () {
		// 
		Game.canvas = document.createElement('canvas');
		Game.hit_canvas = document.createElement('canvas')
		// 
		Game.ctx = Game.canvas.getContext('2d')
		Game.hit_ctx = Game.hit_canvas.getContext('2d')
		//
		Game.layout();
		// metoda layout odpali się przy każdej zmianie wielkości okna
		window.addEventListener('resize', Game.layout, false);
		//
		document.body.appendChild(Game.hit_canvas)
		document.body.appendChild(Game.canvas);
		// Inicjowanie statku , kamieni
		for (let i = 0; i < 4; i++) {
			new Rock(1)
		}
		Game.ship = new Ship();
		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);

		// rozpoczęcie pętli gry
		Game.animationLoop();
	},
	onKey: function (event) {
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
				Game['key_' + event.keyCode] = false;
			}
		}

	},
	// Ta metoda będzie odpalana przy każdej zmianie wielkości okna
	layout: function (ev) {
		// 
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		// 
		VAR.d = Math.min(VAR.W, VAR.H);
		// Update wielkości canvas
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;
		//
		Game.hit_canvas.width = VAR.W;
		Game.hit_canvas.height = VAR.H;
		Game.hit_ctx.fillStyle = 'red'
		//
		Game.ctx.fillStyle = 'white'
		Game.ctx.strokeStyle = 'white'
		Game.ctx.lineWidth = 3
		Game.ctx.lineJoin = 'round'
	},
	// fps = 60
	animationLoop: function (time) {
		requestAnimationFrame(Game.animationLoop);
		// ograniczenie do ilości klatek zdefiniowanych w właściwości obiektu VAR 
		if (time - VAR.lastTime >= 1000 / VAR.fps) {
			VAR.lastTime = time;
			//
			// oczyszczenie canvas
			Game.ctx.clearRect(0, 0, VAR.W, VAR.H)
			Game.hit_ctx.clearRect(0, 0, VAR.W, VAR.H)
			//
			//
			//
			// Rysowanie statku
			Game.ship.draw();

			Bullet.draw()

			Rock.draw()

		}
	}
}