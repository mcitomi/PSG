async function getProducts() {  // sajat api teszt - cors
    try {
        const response = await fetch("http://localhost:3000/products"); // cors test

        if (!response.ok) {
            throw new Error("Server error");
        }

        const body = await response.json();

        console.log(body);
    } catch (error) {
        console.error("valami hiba tortent")
    }
}

const target = document.getElementById("target");

async function getPhotos() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");

        if(!response.ok) {
            throw new Error("A szerver hibát adott");
        }

        const body = await response.json();

        for (let i = 0; i < 10; i++) {
            const photo = body[i];

            target.innerHTML += `
                <h1>${photo.title}</h1>
                <img src="${photo.url}"></img>"
            `;
        }

    } catch (error) {   // hiba "elkapása"
        console.log(error);
        
        target.innerHTML = "Valami hiba történt"
    }
}

async function getComments() {
    try {
        const url = new URL("https://jsonplaceholder.typicode.com/comments");   // paraméter biztonságos hozzáadása
        url.searchParams.append("postId", "10");

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("A szerver hibát adott");
        }

        const body = await response.json();

        body.forEach(comment => {
            target.innerHTML += `
            Poszt: ${comment.postId}
            <h1>${comment.name}</h1>
            <p>${comment.body}</p>
            `;
        });

    } catch (error) {   // hiba "elkapása"
        console.log(error);
        
        target.innerHTML = "Valami hiba történt"
    }
}