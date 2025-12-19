// tömbön belüli elemek: márka, motor, lóerő, üzemanyag
// { "márka": "Chevrolet", "motor": "1.4", ... }
let cars = [];

function addCar(event) {
    // ne töltsön újra az oldal
    // űrlap elküldésekor alapértelmezett eventListener újratölti az oldalt, így eltűnnek
    // változóink (üres lesz a tömb)
    event.preventDefault();

    // szedjük ki az űrlapból értékeket
    let marka = document.getElementById("marka").value;
    let motor = document.getElementById("motor").value;
    let loero = document.getElementById("loero").value;
    let uzemanyag = document.getElementById("uzemanyag").value;

    // ...illetve azt a szövegdobozt is szerezzük meg az oldalról, amibe megjelenítjük üzeneteket
    let visszajelzes = document.getElementById("registerMessage");

    // új autó létrehozása
    // u.a., mintha azt csinálnám: { "marka": "Chevrolet", "motor": ... }, csak "Chevrolet" helyett
    // az, amit a felhasználó beírt az űrlapba
    let auto = {
        marka,
        motor,
        loero,
        uzemanyag,
    };

    // hozzáadjuk a tömbhöz az autót
    cars.push(auto);

    // megjeleníjük újra az autókat az oldalon
    renderCars();

    // illetve adunk visszajelzést a felhasználónak, a szövegdobozba (<p id="registerMessage">) beleírjuk
    visszajelzes.textContent = "Sikeres feltöltés!";
}

// kb. u.a. mint az onsubmit="addCar"
document.getElementById("registerForm").addEventListener("submit", addCar);


function renderCars() {
    // megint meg kell szerezni azt, ahova írjuk az autókat majd
    let autokHelye = document.getElementById("carList");
    // de mielőtt odaírunk bármit, ki kell üríteni az eddigieket.
    // ha ez nem lenne, akkor minden autó feltöltésénél minden autót kiírna,
    // tehát többször megjelenne az összes autó
    autokHelye.innerHTML = "";

    // végig megyünk az összes autón
    for (let auto of cars) {
        // és minden autónál, hozzáadjuk a "listához", ahova kiírjuk az oldalon az 
        // autókat. ezt +=-vel csináljuk, hogy mindegyik autó megjelenjen.
        autokHelye.innerHTML += `
            <div class="car">
                ${auto.marka} - ${auto.motor} - ${auto.loero} - ${auto.uzemanyag}
            </div>
        `;
    }
}