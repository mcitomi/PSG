const url = 'https://jsonplaceholder.typicode.com/todos'

const adatok = document.getElementById('adatok');

async function lekerdezes() {
    try {
        let response = await fetch(url);

        if (response.ok) {
            let data = await response.json();

            for (elem of data) {
                let checkbox = 
                    `<input type="checkbox" disabled ${elem.completed ? "checked": ""}>`;
                adatok.innerHTML += checkbox;

                adatok.innerHTML += `<h1>${elem.title}</h1>`;
            }

            /*
            let checkbox = `<input type="checkbox" disabled>`;
            if (data.completed) {
                let checkbox = `<input type="checkbox" checked disabled>`;
            }
            */
        } else {
            adatok.innerHTML = 'Valami hiba történt a szerveren.';
        }
    } catch (error) {
        adatok.innerHTML = 'Valami hiba történt a hálózattal.';
    }
}