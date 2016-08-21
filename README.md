# Teknőcgrafika
## English
This is a client-side, web-based application to draw turtle graphics using [Blockly](https://github.com/google/blockly). It is fun to play with, but the interface is in hungarian, and currectly there are no plans to make it international. Sorry.

You can, however, browse the source code and use it to build your own application.

## Magyar
A teknőcgrafika egy régi, és jól bevált módszer a programozás alapjainak tanítására. A fogalom szorosan összefonódott a [Logo](https://hu.wikipedia.org/wiki/Logo_(programozási_nyelv)) programozási nyelvvel, ám attól függetlenül is létezik. Mitöbb, az elmúlt években megjelent blokknyelveknek köszönhetően végre elfelejthetjük a Logo kissé idejétmúlt szintaxisát.

Ez az alkalmazás a böngészőben fut, ezért külön program telepítése nélkül is használható. A puzzle elemek lehetővé teszik, hogy az ember egy konkrét programnyelv megtanulása nélkül is elsajátítsa a programozás alapjait. Az algoritmizálás és programszervezés lépéseinek megismerése után pedig a szöveges programozás is könnyebbé válik.

### Képességek
- A hazánkban is ismert [Imagine Logótól](http://imagine.elte.hu/) (Comenius Logo) és [LibreLogótól](http://librelogo.org/hu/) eltérően a kódot puzzle elemek felhasználásával lehet összeállítani. A létrehozott blokk ábra tulajdonképpen egy pszeudokód, ami az egymásba ágyazásoknak és a különböző színű elemeknek köszönhetően könnyen értelmezhető.
- A teknős feje nem csak a teknős irányát jelzi, hanem az aktuális vonalszínt és kitöltő színt is.
- A blokk ábrák és az elkészült rajzok külön-külön képként (`.png`) elmenthetők.
- A blokk ábrák kódja XML (`.turtle`) formátumba menthető, és később visszaállítható.

### Hiányosságok
- Az alkalmazás nem valósítja meg a Logo nyelv teljes eszközkészletét. Az elérhető funkciók az alakzatok rajzolására korlátozódnak.
- Az alkalmazás jelenleg egy teknőst tud kezelni. (Ez a jövőben változhat.)
