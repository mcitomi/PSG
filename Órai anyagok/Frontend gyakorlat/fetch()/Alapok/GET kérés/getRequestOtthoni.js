// 1. megoldás: XMLHttpRequest
const url = 'https://jsonplaceholder.typicode.com/todos/1';

// XMLHttpRequest osztály, régi megoldás HTTP kérések küldésére.
let xhr = new XMLHttpRequest();

// Megnyitjuk a kapcsolatot, GET metódussal küldönk egy kérést a megadott
// linkre.
xhr.open('GET', url, false);

// Ha megkaptuk a választ a szervertől, a függvény lefut.
xhr.onload = function() {
    // 200 és 300 státuszkód között van, ha sikeres volt a kérés.
    if (xhr.status >= 200 && xhr.status < 300) {
        let data = JSON.parse(xhr.responseText);

        console.log(data);
    } else {
        // Ebben az esetben nem szeretnénk megjelíteni a választ, ahhoz semmi
        // köze felhasználónak.
        console.log('Nem sikerült lekérni az adatokat.');
    }
}

// Ha valamilyen (hálózati, stb...) hiba miatt már a kérést sem sikerül
// elküldeni, ez a függvény fut le.
xhr.onerror = function() {
    console.log('Nem sikerült elküldeni a kérést.');
}

// Kérés elküldése.
xhr.send()

// 2. megoldás: fetch()
const url2 = 'https://jsonplaceholder.typicode.com/todos/2';

// fetch() -> ugyanúgy elküldi HTTP kérést.
// Promise objektummal tér vissza, amely később Response objektum lesz.
//     - Nem tudni mikor, meg kell várni, de egyszer biztosan visszatér,
//       vagy hibával, vagy a Response objektummal.
//     - Aszinkron futásnak hívjuk ezt.
fetch(url)
    // .then()-el megvárjuk amíg a fetch() visszatér a tényleges válasszal,
    // majd lefut.
    .then(response => {
        if (!response.ok) {
            throw new Error('A HTTP válasz nem volt Ok.');
        }
        // ha megnézzük a Response.json() metódust, az is aszinkron (miért?)
        // Tehát ismételten várakozunk.
        return response.json();
    })
    // Ha már JSON formátumban van a megkapott válasz, dolgozhatunk vele.
    .then(data => {
        console.log(data);
    })
    // Ha pedig valami hiba történt az egész futás/várakozás alatt, ide ugrunk.
    .catch(error => {
        console.log('Nem sikerült lekérni az adatokat.');
    });

// 3. megoldás: fetch(), de async/await
const url3 = 'https://jsonplaceholder.typicode.com/todos/2';

try {
    // Megvárjuk rögtön a választ, nem kell then, stb.
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("A HTTP válasz nem volt Ok.");
    }

    // Formázzuk, értelmezzük a választ JSON-ként, szintén aszinkron futás.
    const data = await response.json()

    console.log(data);
} catch (error) {
    console.log('Nem sikerült lekérni az adatokat.');
}
