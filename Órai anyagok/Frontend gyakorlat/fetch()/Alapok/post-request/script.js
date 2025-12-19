const url = 'https://jsonplaceholder.typicode.com/todos';
const result = document.getElementById('result');
const form = document.getElementById('todoForm');

// paraméterben kérjük be az adatokat, mivel így nincsen
// összekötve az űrlappal, és könnyebb tesztelni, illetve
// a működése logikusabb, hiszen az adatok bekérése nem ennek
// a dolga, hanem csak a kérés elküldése.
async function sendTodo(userTitle, userDescription) {
    try {
        // JSONPlaceHolder API leírása szerint vár title, body, userId mezőket
        // ezért ezeket elmentjük egybe (egy objektumba), illetve hozzárakjuk a
        // userId-t, amit most beégetünk, de később nyílván az aktuális
        // bejelentkezett felhasználó azonosítója lenne.
        let todo = {
            title: userTitle,
            body: userDescription,
            userId: 1
        };

        // fetch() második paramétere leírás lehet a kérésről, szintén egy
        // objektumban
        let response = await fetch(url, {
            // HTTP metódus
            method: 'POST',
            // Fejlécek
            headers: {
                // JSON formátumban küldjük el a kérést.
                'Content-Type': 'application/json'
            },
            // Törzse a kérésnek, de itt szövegként kell megadni, tehát kell
            // a JSON.stringify(), ennek adjuk át az előbb elkészített,
            // a szerver leírásának megfelelő objektumot.
            body: JSON.stringify(todo)
        });

        const data = await response.json();

        result.innerHTML = `<strong>Válasz: </strong>${JSON.stringify(data)}`;
    } catch {
        result.innerHTML = "Valami hiba történt.";
    }
}

// u.a. mint amikor a gombra rakunk egy onclick-et pl.
// csak így utólag helyezzük rá, JS-en keresztül.
// második paraméterbe egy függvényt vár, amely kaphat egy 
// paramétert, amelyben tárolja az eventtel kapcsolatos adatokat.
form.addEventListener('submit', (event) => {
    // A form submit eventje alapvetően újratölti az oldalt,
    // de mi szeretnénk ezt elkerülni.
    // A preventDefault() függvény az alapértelmezett működését
    // megelőzi, tiltja a jelenlegi HTML elemnek, ebben az esetben
    // a form újratöltését.
    event.preventDefault();
    
    // kiszedjük a formból az adatokat
    let userTitle = document.getElementById('title').value;
    let userDescription = document.getElementById('description').value;

    sendTodo(userTitle, userDescription);
});