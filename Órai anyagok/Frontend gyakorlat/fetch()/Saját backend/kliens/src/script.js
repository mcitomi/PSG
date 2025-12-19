const target = document.getElementById("target");

async function searchBooks(title) {
  try {
    let response = await fetch(`http://localhost:3001/books?title=${title}`);

    if (!response.ok) {
      if (response.status == 404) {
        target.innerHTML = "<h1>Nem található ez a könyv.</h1>";
        return;
      }
      throw new Error("A válasz nem volt Ok.");
    }

    let books = await response.json();

    target.innerHTML = "";
    if (books.title) {
        // egyet adott vissza
        target.innerHTML += `
            <h1>Cím: ${books.title}</h1>
            <p>Szerző: ${books.author}</p>
            <p>Oldalszám: ${books.pages}</p>
        `;
    } else {
        // többet adott vissza
        for (let book of books) {
            target.innerHTML += `
                <h1>Cím: ${book.title}</h1>
                <p>Szerző: ${book.author}</p>
                <p>Oldalszám: ${book.pages}</p>
            `;
        }
    }

    
  } catch (err) {
    console.log(err);
    target.innerHTML = "<h1>Valami hiba történt</h1>";
  }
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let userTitle = document.getElementById("title").value;

  searchBooks(userTitle);
});
