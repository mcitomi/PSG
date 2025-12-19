// 1. megoldás: XMLHttpRequest - elavult
const url = 'https://jsonplaceholder.typicode.com/todos/1';

let xhr = new XMLHttpRequest();

xhr.open('GET', url);

xhr.onload = function() { // u.a. mint () => {, vagy ha leírok egy másik függvényt és azt írom ide
    if (xhr.status >= 200 && xhr.status < 300) { // jó ág!
        let data = JSON.parse(xhr.responseText);

        console.log(data);
    } else {
        // Válasznál van a hiba
        console.log('Nem sikerült lekérni az adatokat.');
    }
};

// Kérésnél van a hiba
xhr.onerror = function() {
    console.log('Nem sikerült elküldeni a kérést.');
};

xhr.send();

// Twitter
// <div onclick="posztMegnyitasa()"> Vicces poszt </div>

// posztMegnyitasa()
//  átírányít a poszthoz
//  lekérdezi a kommenteket
//  megjeleníti a felhasználónak

// 2. megoldás: fetch()
const url2 = 'https://jsonplaceholder.typicode.com/todos/2';

fetch(url2)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log("A válasz nem volt Ok.");
        }
    })
    .then((data) => {
        console.log(data);
    });

// 3. megoldás
const url3 = 'https://jsonplaceholder.typicode.com/todos/3';

async function lekerdezes() {
    try {
        let response = await fetch(url3);

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            console.log(data.title);
        } else {
            console.log("A válasz nem volt Ok.");
        }
    } catch (error) {
        console.log('Nem sikerült elküldeni a kérést.');
    }
}

lekerdezes();