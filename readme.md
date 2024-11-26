https://www.youtube.com/watch?v=xiWtqVtd1Oo

### Prettier formatting:    
```prettier .\src\index.js --write --tab-width 4```

#### ESLint check:
```npx eslint .\src\```

## React 
- Install:
```npm i react react-dom react-scripts```

**react:** maga az a csomag ami a reactot adja </br>
**react-dom:** HTML-t módosítunk vele </br>
**react-scripts:** react futtatása

- `package.json` fájlhoz adjunk hozzá egy új scriptet: `"start" : "react-scripts start"`
- Indítás: `npm start`

A Reactot sima javascript js fájlok helyett jsx fájlokban írjuk (JavaScript XML), mert ez a fájltípus képes kezelni html kódokat a scriptjeink mellett.

#### React elemek
`import {useState} from 'react';`   // a statek változásakor frissül a react dom

`import React, { StrictMode } from "react";`    // react modul 

`import { createRoot } from "react-dom/client";`    // létrehozzuk a root-ot az index.jsx-ben, ez lesz amibe felépül az oldal minden eleme.

`const root = createRoot(document.getElementById("root"));`    // ilyenkor a document mindig a public/index.html fájlra vonatkozik, amiben létrehoztunk egy #root id-jű divet, és semmi mást</br>

### Komponensek
HTML kódrészletek, pl egy gomb, szövegdoboz
Lehet interaktívitás, nem kell egy gombot 10x megíni, elég 1x és csak be kell importálni / meghívni

A komponens neveket negy betűvel kezdjük pl StrictMode, ez igaz a fileokra is pl App.jsx (de ez csak formaiság)

