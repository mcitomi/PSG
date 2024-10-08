async function getProducts() {
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



    } catch (error) {   // hiba "elkapása"
        console.error("valami hiba tortent");
    }

}
