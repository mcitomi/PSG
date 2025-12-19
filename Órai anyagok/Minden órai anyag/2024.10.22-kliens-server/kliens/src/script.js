function $(elementId) {
    return document.getElementById(elementId);
}

async function searchBooks(title) {
    try {
        const response = await fetch(
            `http://localhost:3001/books?title=${title}`,
        );

        if (!response.ok) {
            if(response.status == 404) {
                $("target").innerHTML = `<h1>Nem található!</h1>`;
                return;
            }
            throw new Error("A szerver válasza nem Ok!");
        }

        const books = await response.json();

        if(books.title) {
            $("target").innerHTML = `
                <h1>${books.title}</h1>
                <p>Szerző: ${books.author}</p>
                <p>Oldalak száma: ${books.pages}</p>
            `;
        } else {
            for(const book of books) {
                $("target").innerHTML += `
                    <h1>${book.title}</h1>
                    <p>Szerző: ${book.author}</p>
                    <p>Oldalak száma: ${book.pages}</p>
                `;
            }
        }
       
    } catch (e) {
        $("target").innerHTML = `<h1>Valami hiba történt</h1>`;
        console.error(e);
    }
}

$("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();

    $("target").innerHTML = "";

    const inputTitle = $("title").value;

    searchBooks(inputTitle);
});
