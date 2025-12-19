async function searchAlbum(title) {
    try {
        const url = new URL("http://localhost:3000/albums");
        url.searchParams.append("title", title);

        const response = await fetch(url);

        if (!response.ok) {
            document.getElementById("content").innerText = "Valami hiba történt!";
            return;
        }

        const body = await response.json();

        if(Object.keys(body).length == 0) {
            document.getElementById("content").innerHTML = `<h3 class="text-center">Nincs találat!</h3>`;
            return;
        }

        document.getElementById("content").innerHTML = "";

        for (const album of body) {
            document.getElementById("content").innerHTML += `
            <div style="width: 600px; margin-right:auto; margin-left:auto;" class="my-3 p-3 rounded border border-dark ">
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
            </div>
            `;
        }
    } catch (error) {
        document.getElementById("content").innerText = "Valami hiba történt!";
    }
}

document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("search").value;

    if (!title) {
        alert("Hiányzó adat!");
        return;
    }

    searchAlbum(title);
});
