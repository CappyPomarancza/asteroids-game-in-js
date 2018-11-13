// Inicjuję grę dopiero po załadowaniu całej strony
window.onload = function(){
	Game.init();
}
// Obiekt, w którym będą przechowywane „podręczne” wartości
VAR = {
	fps:60,
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
// Obiekt zawierający bazowe funckje związane z grą.
// Game nie ma konstruktora, jest jedynie obiektem grupującym funkcje.
Game = {
	// init zostanie odpalone raz po załadowaniu strony.
	init:function(){
		// Tworzę canvas
		Game.canvas = document.createElement('canvas');
		// Przypisuję kontekst 2D do zmiennej ctx, która jest właściwością obiektu Game
		Game.ctx = Game.canvas.getContext('2d');
		// odpalam metodę obiektu Game
		Game.layout();
		// metoda layout odpali się przy każdej zmianie wielkości okna
		window.addEventListener('resize', Game.layout, false);
		// Canvas zostaje dodany do DOM
		document.body.appendChild(Game.canvas);
		// rozpoczęcie pętli gry
		Game.animationLoop();
	},
	// Ta metoda będzie odpalana przy każdej zmianie wielkości okna
	layout:function(ev){
		// Dla łatwiejszego pisania wielkość okna zostaje przypisana do właściwości W i H obiektu VAR
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		// Wiele wielkości będzie bazowało na krótszym boku wielkości okna, dlatego można od razu przypisać go do właściwości obiektu VAR
		VAR.d = Math.min(VAR.W, VAR.H);
		// Update wielkości canvas
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;
		// Po zmianie wilekości canvas resetują się kolory i grubości linii, dlatego to właśnie tutaj trzeba je zawsze na nowo definiować
		Game.ctx.fillStyle = 'white'
		Game.ctx.strokeStyle = 'white'
		Game.ctx.lineWidth = 3
		Game.ctx.lineJoin = 'round'
	},
	// Funkcja, która odpala się 60 razy na sekundę
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		// ograniczenie do ilości klatek zdefiniowanych w właściwości obiektu VAR (nie więcej niż VAR.fps)
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			//
			// oczyszczenie canvas
			Game.ctx.clearRect(0,0,VAR.W, VAR.H);
			
		}
	}
}