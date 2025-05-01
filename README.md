# React XSS Bank

Ez az alkalmazás háromféle XSS sebezhetőséget demonstrál:
- **Reflected XSS:** A keresőoldalon a felhasználó URL paraméterét a `dangerouslySetInnerHTML` segítségével jelenítjük meg.
- **DOM-based XSS:** A befektetési alapok oldalon a böngésző URL hash részét olvassuk be, és közvetlenül a DOM-ba illesztjük be.
- **Stored XSS:** Az ügyfélüzenetek (feedback) oldalon a felhasználók által beküldött üzeneteket (amelyek tárolva vannak a localStorage-ban) jelenítjük meg a `dangerouslySetInnerHTML` használatával.

## Futtatás

1. Node.js telepítése
2. git clone
3. cd react-xss-bank
4. npm install
5. npm start


