async function getAlbums() {
    try {
        const response = await fetch("http://localhost:3000/albums");

        if (!response.ok) {
            document.getElementById("content").innerText = "Valami hiba történt!";
            return;
        }

        const body = await response.json();

        for (const album of body) {
            document.getElementById("content").innerHTML += `
            <div style="width: 600px; margin-right:auto; margin-left:auto;" class="my-3 p-3 rounded border border-dark">
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
            </div>
            `;
        }
    } catch (error) {
        document.getElementById("content").innerText = "Valami hiba történt!";
    }
}
