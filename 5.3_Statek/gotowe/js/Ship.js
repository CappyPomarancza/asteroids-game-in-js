function Ship(){
	// Wszystkie wartości podaję względem wielkości okna (przechowywanej w właściwościach H i W obiektu VAR)
	// 
	// Statek to trójkąt wpisany w okrąg. O jego wielkości decyduje promień okręgu.
	this.r = 0.04;
	// Patrząc na okrąg i zakładając, że linia idąca pionowo w dół od środka okręgu idze pod kątem 0 stopni, punkt, który będzie dziobem statku jest wyznaczony przez przecięcie okręgu przez odcinek znajdujący się pod kątem 180 stopni
	// Za to rufę statku wyznaczaja przecięcie okręgu przez odcinki pod kątem 50 i -50 stopni.
	this.rear_a = 50;
	// Kąt obrotu statku
	this.a = 0;
	// X i Y dla odmiany będziemy podawali w pixelach. Pozwoli nam to potem uniknąć problemów z kierunkiem lotu i kolizjami statku, pocisków i asteroidów
	this.x = VAR.W/2;
	this.y = VAR.H/2;
	// Statek składa się z trzech punktów, które przechowamy jako obiekty w tablicy. Narazie obiekty są puste
	this.points = [{},{},{}];
}
// Metoda, która rysuje statek
Ship.prototype.draw = function() {
	// rozpocznij rysowanie ścieżki
	Game.ctx.beginPath()
	// rysowanie poszczególnych linii
	// Mimo, że statek składa się z 3 punktów pętla odtwarza się 4 razy, bo pierwszy ruch przesuwa piórko w wybrany punkt, a dopiero kolejne iteracje rysują linię
	for (var i = 0; i < 3; i++) {
		// przypisanie aktualnego kąta (różne w zależności od rysowanego punktu)
		// dziób ma 180 stopni (i==0), rufa 50 (i==1) i -50 (i==2)
		this.tmp_a = i===0 ? this.a : (this.a+180 + (i==1 ? this.rear_a : -this.rear_a));
		// aby przesunąć punkt obrotu został zmieniony promień okręgu dla rufy
		// dziub (i==0) promień = r startku, rufa (i==1 albo i==2) promień = 60% r statku
		this.tmp_r = i===0 ? this.r*1 : this.r*0.6;
		// 
		// Punkty są przechowywane w tablicy obiektów.
		// Dzięki temu będziemy mogli sprawdzić czy statek rozbił się na skałach czy nie
		//
		// Znowu przypomnienie trygonometrii.
		// Promień jest przechowywany jako wartość względna dlatego wszystko trzeba pomnożyć przez VAR.d (które jest albo szerokością albo wysokością canvas – w zależności co jest krotsze)
		// Na koniec należy dodać aktualną wartość x i odpowiednio y
		this.points[i].x = (Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.x;
		this.points[i].y = (-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.y;
		// Rysowanie
		// wykorzystując notację nawiasów kwadratowych przesuwamy piórko rysując linię lub nie (nie rysujemy tylko jak i==0)
		Game.ctx[i===0?'moveTo':'lineTo'](this.points[i].x,this.points[i].y);
	}
	// ostatni odcinek linii rysuje zamknięcie ścieżki
	Game.ctx.closePath()
	Game.ctx.stroke()
};
