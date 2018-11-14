function Ship() {
	//  
	// Statek to trójkąt wpisany w okrąg. O jego wielkości decyduje promień okręgu.
	this.r = 0.04;
	// Patrząc na okrąg i zakładając, że linia idąca pionowo w dół od środka okręgu idze pod kątem 0 stopni, punkt, który będzie dziobem statku jest wyznaczony przez przecięcie okręgu przez odcinek znajdujący się pod kątem 180 stopni
	// Za to rufę statku wyznaczaja przecięcie okręgu przez odcinki pod kątem 50 i -50 stopni.
	this.rear_a = 50;
	// Kąt obrotu statku
	this.a = 0;
	// X i Y  w pixelach. Pozwoli to potem uniknąć problemów z kierunkiem lotu i kolizjami statku, pocisków i asteroidów
	this.x = VAR.W / 2;
	this.y = VAR.H / 2;

	this.modX = 0;
	this.modY = 0;

	this.acc = 0.0004;

	this.maxMod = 0.019;
	//
	this.points = [{}, {}, {}];
}
//
Ship.prototype.draw = function () {
	if (Game.key_37 || Game.key_39) {
		this.a = this.a + 7 * (Game.key_37 ? -1 : 1);
	}
	if (Game.key_38) {
		this.modX = Math.max(
			-this.maxMod * VAR.d,
			Math.min(
				this.maxMod * VAR.d,
				this.modX + Math.sin(Math.PI / 180 * this.a) * this.acc * VAR.d
			)
		)
		this.modY = this.modY - Math.cos(Math.PI / 180 * this.a) * this.acc * VAR.d
	} else {
		this.modX = this.modX * 0.98

		this.modX = Math.abs(this.modX)<0.0001 ? 0 : this.modX
		this.modY = Math.abs(this.modY)<0.0001 ? 0: this.modY

		this.modY = this.modY * 0.98
	}
	this.x += this.modX
	this.y += this.modY

	Game.ctx.beginPath()
	// 
	for (var i = 0; i < 3; i++) {
		// przypisanie aktualnego kąta (różne w zależności od rysowanego punktu)
		// dziób ma 180 stopni (i==0), rufa 50 (i==1) i -50 (i==2)
		this.tmp_a = i === 0 ? this.a : (this.a + 180 + (i == 1 ? this.rear_a : -this.rear_a));
		// aby przesunąć punkt obrotu został zmieniony promień okręgu dla rufy
		// dziub (i==0) promień = r startku, rufa (i==1 albo i==2) promień = 60% r statku
		this.tmp_r = i === 0 ? this.r * 1 : this.r * 0.6;
		// 
		// Punkty są przechowywane w tablicy obiektów.
		//
		this.points[i].x = (Math.sin(Math.PI / 180 * this.tmp_a) * this.tmp_r * VAR.d) + this.x;
		this.points[i].y = (-Math.cos(Math.PI / 180 * this.tmp_a) * this.tmp_r * VAR.d) + this.y;
		// Rysowanie
		// (nie rysujemy tylko jak i==0)
		Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
	}
	//
	Game.ctx.closePath()
	Game.ctx.stroke()
};
