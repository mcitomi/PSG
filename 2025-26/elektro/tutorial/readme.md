# C Programozás tutorial

### Build: (exe file készítése):

Leírás a futtatásról, telepítésről: https://code.visualstudio.com/docs/cpp/config-mingw

Link a telepítőhöz: https://github.com/msys2/msys2-installer/releases/download/2024-12-08/msys2-x86_64-20241208.exe

Ha ez megvan, a követekező paranccsal buildelhetjük le a kódunkat:

`gcc <fileneve>.c -o <kimeneti_file>`

**Magyarázat:**

A gcc kulcsszó után írjuk a fájlunk nevét, amiben írtuk a kódunk, pl main.c. A -o után írjuk a kimeneti fájl neve, ez lesz az exe fájl neve. pl `gcc main.c -o app` -> app.exe

Az alkalamzást futtathatjuk mint egy sima alkalmazást, 2xrányomva ekkor megnyilik egy konzol, vagy cmd-ben a `./app` paranccsal.

**Ajánlott extensionok a vscodehoz:**
https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools

https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-extension-pack

https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools-themes

### Alapok:

Adattípusok: https://en.wikipedia.org/wiki/C_data_types


