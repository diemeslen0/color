			function odswiez()
			{
				var glowny = "rgb(" + document.getElementById('red').value + ", " + document.getElementById('green').value + ", " + document.getElementById('blue').value + ")";
				document.getElementById('kolor').style.backgroundColor = glowny;
				var wynik = document.getElementById('wynik');
				wynik.value = "#";
				wynik.value += hexConvert(document.getElementById('red').value);
				wynik.value += hexConvert(document.getElementById('green').value);
				wynik.value += hexConvert(document.getElementById('blue').value);
				odswiezOdcienie();
				odswiezShadeNoProp();
				odswiezKanaly();
			}
			
			function dodaj(skladowa, wartosc)
			{
				var kolor = document.getElementById(skladowa);
				if(kolor.value < 256 - wartosc) {kolor.value = parseInt(kolor.value) + wartosc;}
				else {kolor.value = wartosc - (256 - parseInt(kolor.value));}
				odswiez();
			}
			
			function odejmij(skladowa, wartosc)
			{
				var kolor = document.getElementById(skladowa);
				if(kolor.value >= wartosc) {kolor.value = parseInt(kolor.value) - wartosc;}
				else {kolor.value = 256 - (wartosc - parseInt(kolor.value));}
				odswiez();
			}
			
			function sprawdz(skladowa)
			{
				var kolor = document.getElementById(skladowa);
				if(kolor.value.length === 0) {kolor.value = "0";}
				else if(kolor.value.length > 3) {kolor.value = kolor.value.substring(0, 3);}
				var punkty = 0;
				for(var i = 0; i < kolor.value.length; i++)
				{
					if(kolor.value.charCodeAt(i) >= 48 && kolor.value.charCodeAt(i) <= 57) {punkty++;}
				}
				if(punkty < kolor.value.length)
				{
					alert("Invalid value!");
					kolor.value = 0;
				}
				if(kolor.value > 255 || kolor.value < 0)
				{
					alert("Invalid value!");
					kolor.value = 0;
				}
			}
			
			function uzupelnij(wartosc)
			{
				if(wartosc.length === 0) {wartosc = "00";}
				else if(wartosc.length === 1) {wartosc = "0" + wartosc;}
				return wartosc;
			}
			
			function hexConvert(dziesietna)
			{
				dziesietna = parseInt(dziesietna);
				var tab = [];
				while(dziesietna > 0)
				{
					var reszta = dziesietna % 16;
					if(reszta > 9) {var reszta = String.fromCharCode(65 + (reszta - 10));}
					tab.push(reszta);
					dziesietna = parseInt(dziesietna / 16);
				}
				tab.reverse();
				var wynik = tab.join("");
				return uzupelnij(wynik);
			}
			
			function decConvert(hex1, hex0)
			{
				var wynik = 0;
				if(hex1.charCodeAt(0) >= 65 && hex1.charCodeAt(0) <= 70) {hex1 = hex1.charCodeAt(0) - 55;}
				else {hex1 = parseInt(hex1);}
				wynik += hex1 * 16;
				if(hex0.charCodeAt(0) >= 65 && hex0.charCodeAt(0) <= 70) {hex0 = hex0.charCodeAt(0) - 55;}
				else {hex0 = parseInt(hex0);}
				wynik += hex0;
				return wynik;
			}
			
			function sprawdzHex()
			{
				var hex = document.getElementById('wynik');
				if(hex.value[0] !== "#") {hex.value = "#" + hex.value;}
				if(hex.value.length < 7)
				{
					for(var i = hex.value.length; i < 7; i++) {hex.value = hex.value + "0";}
				}
				else if(hex.value.length > 7) {hex.value = hex.value.substring(0, 7);}
				for(var i = 1; i < 7; i++)
				{
					var test = 0;
					hex.value = hex.value.toUpperCase();
					if(hex.value.charCodeAt(i) >= 65 && hex.value.charCodeAt(i) <= 70) {test++;}
					if(hex.value.charCodeAt(i) >= 48 && hex.value.charCodeAt(i) <= 57) {test++;}
					if(test === 0 && i < 6) {hex.value = hex.value.substring(0, i) + "0" + hex.value.substring(i + 1, 7);}
					else if(test === 0) {hex.value = hex.value.substring(0, i) + "0";}
				}
			}
			
			function odswiezHex()
			{
				sprawdzHex();
				var kolor = document.getElementById('wynik').value.substring(1, 7);
				document.getElementById('red').value = decConvert(kolor[0], kolor[1]);
				document.getElementById('green').value = decConvert(kolor[2], kolor[3]);
				document.getElementById('blue').value = decConvert(kolor[4], kolor[5]);
				var glowny = "rgb(" + document.getElementById('red').value + ", " + document.getElementById('green').value + ", " + document.getElementById('blue').value + ")";
				document.getElementById('kolor').style.backgroundColor = glowny;
				odswiezOdcienie();
			}
			
			function wybierzKolor(wybrany)
			{
				var kolor = wybrany.substring(4, wybrany.length - 1);
				kolor = kolor.split(", ");
				document.getElementById('red').value = kolor[0];
				document.getElementById('green').value = kolor[1];
				document.getElementById('blue').value = kolor[2];
				odswiez();
			}
			
			function odswiezOdcienie()
			{
				var odcienie = document.getElementsByClassName('shade');
				var czerw = parseInt(document.getElementById('red').value);
				var ziel = parseInt(document.getElementById('green').value);
				var nieb = parseInt(document.getElementById('blue').value);
				var mod = 0;
				for(var i = 10; i >= 0; i--)
				{
					var canalR = czerw + mod;
					var canalG = ziel + mod;
					var canalB = nieb + mod;
					
					if(canalR - 10 >= 0 && canalG - 10 >= 0 && canalB - 10 >= 0) {mod -= 10;}
					odcienie[i].style.backgroundColor = sklejKolor(canalR, canalG, canalB);
					odcienie[i].title = odcienie[i].style.backgroundColor;
				}
				var mod = 0;
				for(var i = 10; i < odcienie.length; i++)
				{
					var canalR = czerw + mod;
					var canalG = ziel + mod;
					var canalB = nieb + mod;

					if(canalR + 10 < 256 && canalG + 10 < 256 && canalB + 10 < 256) {mod += 10;}
					odcienie[i].style.backgroundColor = sklejKolor(canalR, canalG, canalB);
					odcienie[i].title = odcienie[i].style.backgroundColor;
				}
				for(var i = 0; i < odcienie.length; i++)
				{
					odcienie[i].onclick = function() {wybierzKolor(this.style.backgroundColor);}
					odcienie[i].onmouseover = function() {this.style.borderRadius = "0%";}
					odcienie[i].onmouseout = function(){this.style.borderRadius = "30%";}
				}
			}
			
			function sklejKolor(r, g, b)
			{
				var kolor = "rgb(";
				kolor += String(r) + ", ";
				kolor += String(g) + ", ";
				kolor += String(b) + ")";
				return kolor;
			}
			
			function odswiezKanaly()
			{
				var odcienieRed = document.getElementsByClassName('shadeRed');
				var odcienieGreen = document.getElementsByClassName('shadeGreen');
				var odcienieBlue = document.getElementsByClassName('shadeBlue');
				
				var kanalRed = parseInt(document.getElementById('red').value);
				var kanalGreen = parseInt(document.getElementById('green').value);
				var kanalBlue = parseInt(document.getElementById('blue').value);
				var mod = -100;
				for(var i = 0; i < 21; i++)
				{
					var modRed;
					var modGreen;
					var modBlue;
					
					if(kanalRed + mod < 0) {modRed = 0;}
					else if(kanalRed + mod > 255) {modRed = 255;}
					else {modRed = kanalRed + mod;}
					
					odcienieRed[i].style.backgroundColor = sklejKolor(modRed, kanalGreen, kanalBlue);
					odcienieRed[i].title = odcienieRed[i].style.backgroundColor;
					odcienieRed[i].onclick = function() {wybierzKolor(this.style.backgroundColor);}
					odcienieRed[i].onmouseover = function() {this.style.borderRadius = "0%";}
					odcienieRed[i].onmouseout = function(){this.style.borderRadius = "30%";}
					
					if(kanalGreen + mod < 0) {modGreen = 0;}
					else if(kanalGreen + mod > 255) {modGreen = 255;}
					else {modGreen = kanalGreen + mod;}
					
					odcienieGreen[i].style.backgroundColor = sklejKolor(kanalRed, modGreen, kanalBlue);
					odcienieGreen[i].title = odcienieGreen[i].style.backgroundColor;
					odcienieGreen[i].onclick = function() {wybierzKolor(this.style.backgroundColor);}
					odcienieGreen[i].onmouseover = function() {this.style.borderRadius = "0%";}
					odcienieGreen[i].onmouseout = function(){this.style.borderRadius = "30%";}
					
					if(kanalBlue + mod < 0) {modBlue = 0;}
					else if(kanalBlue + mod > 255) {modBlue = 255;}
					else {modBlue = kanalBlue + mod;}
					
					odcienieBlue[i].style.backgroundColor = sklejKolor(kanalRed, kanalGreen, modBlue);
					odcienieBlue[i].title = odcienieBlue[i].style.backgroundColor;
					odcienieBlue[i].onclick = function() {wybierzKolor(this.style.backgroundColor);}
					odcienieBlue[i].onmouseover = function() {this.style.borderRadius = "0%";}
					odcienieBlue[i].onmouseout = function(){this.style.borderRadius = "30%";}
					
					mod += 10;
				}
			}
			
			function odswiezShadeNoProp()
			{
				var odcienieNoProp = document.getElementsByClassName('shadeNoProp');
				var kanalR = parseInt(document.getElementById('red').value);
				var kanalG = parseInt(document.getElementById('green').value);
				var kanalB = parseInt(document.getElementById('blue').value);
				var mod = -100;
				for(var i = 0; i < 21; i++)
				{
					var modRed = kanalR + mod;
					var modGreen = kanalG + mod;
					var modBlue = kanalB + mod;
					if(modRed < 0) {modRed = 0;}
					else if(modRed > 255) {modRed = 255;}
					if(modGreen < 0) {modGreen = 0;}
					else if(modGreen > 255) {modGreen = 255;}
					if(modBlue < 0) {modBlue = 0;}
					else if(modBlue > 255) {modBlue = 255;}
					
					odcienieNoProp[i].style.backgroundColor = sklejKolor(modRed, modGreen, modBlue);
					odcienieNoProp[i].title = odcienieNoProp[i].style.backgroundColor;
					odcienieNoProp[i].onclick = function() {wybierzKolor(this.style.backgroundColor);}
					odcienieNoProp[i].onmouseover = function() {this.style.borderRadius = "0%";}
					odcienieNoProp[i].onmouseout = function(){this.style.borderRadius = "30%";}
					mod += 10;
				}
			}
			
			function losujKolor()
			{
				document.getElementById('red').value = Math.floor(Math.random() * 256);
				document.getElementById('green').value = Math.floor(Math.random() * 256);
				document.getElementById('blue').value = Math.floor(Math.random() * 256);
				odswiez();
			}
			
			function przygotujGotowe()
			{
				var gotowce = document.getElementsByClassName('gotowy');
				for(var i = 0; i < 180; i++)
				{
					var nowyR = Math.floor(Math.random() * 256);
					var nowyG = Math.floor(Math.random() * 256);
					var nowyB = Math.floor(Math.random() * 256);
					gotowce[i].style.backgroundColor = sklejKolor(nowyR, nowyG, nowyB);
					gotowce[i].onmouseover = function() {this.style.borderRadius = "0%";}
					gotowce[i].onmouseout = function() {this.style.borderRadius = "50%";}
					gotowce[i].title = gotowce[i].style.backgroundColor;
					gotowce[i].onclick = function() {wybierzKolor(this.style.backgroundColor);}
				}
			}
			
			var plusPlusy = document.getElementsByClassName('plusPlus');
			plusPlusy[0].onclick = function() {dodaj('red', 10);}
			plusPlusy[1].onclick = function() {dodaj('green', 10);}
			plusPlusy[2].onclick = function() {dodaj('blue', 10);}
			var plusy = document.getElementsByClassName('plus');
			plusy[0].onclick = function() {dodaj('red', 1);}
			plusy[1].onclick = function() {dodaj('green', 1);}
			plusy[2].onclick = function() {dodaj('blue', 1);}
			var minusy = document.getElementsByClassName('minus');
			minusy[0].onclick = function() {odejmij('red', 1);}
			minusy[1].onclick = function() {odejmij('green', 1);}
			minusy[2].onclick = function() {odejmij('blue', 1);}
			var minusMinusy = document.getElementsByClassName('minusMinus');
			minusMinusy[0].onclick = function() {odejmij('red', 10);}
			minusMinusy[1].onclick = function() {odejmij('green', 10);}
			minusMinusy[2].onclick = function() {odejmij('blue', 10);}
			document.getElementById('red').onchange = function() {sprawdz('red'); odswiez();}
			document.getElementById('green').onchange = function() {sprawdz('green'); odswiez();}
			document.getElementById('blue').onchange = function() {sprawdz('blue'); odswiez();}
			document.getElementById('wynik').onchange = function() {odswiezHex();}
			
			for(var i = 0; i < 3; i++)
			{
				plusPlusy[i].onmouseover = function() {this.style.borderRadius = "50%";}
				plusy[i].onmouseover = function() {this.style.borderRadius = "50%";}
				minusMinusy[i].onmouseover = function() {this.style.borderRadius = "50%";}
				minusy[i].onmouseover = function() {this.style.borderRadius = "50%";}
				plusPlusy[i].onmouseout = function() {this.style.borderRadius = "20%";}
				plusy[i].onmouseout = function() {this.style.borderRadius = "20%";}
				minusMinusy[i].onmouseout = function() {this.style.borderRadius = "20%";}
				minusy[i].onmouseout = function() {this.style.borderRadius = "20%";}
			}
			
			var kontener2 = document.getElementById('kontener2');
			var kontener3 = document.getElementById('kontener3');
			var kontener4 = document.getElementById('kontener4');
			var kontener5 = document.getElementById('kontener5');
			var kontener6 = document.getElementById('kontener6');
			for(var i = 0; i < 21; i++) 
			{
				var nowyShade = document.createElement('div');
				nowyShade.setAttribute('class', 'shade');
				kontener2.appendChild(nowyShade);
				
				var nowyShadeNoProp = document.createElement('div');
				nowyShadeNoProp.setAttribute('class', 'shadeNoProp');
				kontener3.appendChild(nowyShadeNoProp);
				
				var nowyShadeRed = document.createElement('div');
				nowyShadeRed.setAttribute('class', 'shadeRed');
				kontener4.appendChild(nowyShadeRed);
				
				var nowyShadeGreen = document.createElement('div');
				nowyShadeGreen.setAttribute('class', 'shadeGreen');
				kontener5.appendChild(nowyShadeGreen)
				
				var nowyShadeBlue = document.createElement('div');
				nowyShadeBlue.setAttribute('class', 'shadeBlue');
				kontener6.appendChild(nowyShadeBlue)
			}
			var kontener7 = document.getElementById('kontener7');
			for(var i = 0; i < 180; i++)
			{
				var nowyGotowy = document.createElement('div');
				nowyGotowy.setAttribute('class', 'gotowy');
				kontener7.appendChild(nowyGotowy);
			}
			
			document.getElementById('losuj').onclick = function() {losujKolor();}
			odswiez();
			przygotujGotowe();
