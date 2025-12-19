async function postNewAlbum(artist, title) {
    try {
        const response = await fetch("http://localhost:3000/albums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                "artist": artist,
                "title": title
            })
        });

        if (!response.ok) {
            document.getElementById("content").innerText = "Valami hiba történt!";
            return;
        }

        const body = await response.json();

        document.getElementById("content").innerHTML = `
            <h5>Feltöltött album:</h5>
            <div style="width: 600px; margin-right:auto; margin-left:auto;" class="my-3 p-3 rounded border border-dark">
            <h3>${body.title}</h3>
            <p>${body.artist}</p>
            </div>
        `;
        document.getElementById("title").value = document.getElementById("artist").value = "";
        alert("Sikeres feltöltés!");

    } catch (error) {
        document.getElementById("content").innerText = "Valami hiba történt!";
    }
}

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;

    if (!title || !artist) {
        alert("Hiányzó adatok!");
        return;
    }

    postNewAlbum(artist, title);
});
