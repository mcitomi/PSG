const url = 'https://jsonplaceholder.typicode.com/posts';
// Kimentjük külön, hogy ha később módosítanánk az id-t,
// akkor ne kelljen több helyen módosítani.
const target = document.getElementById('target');

async function fetchPosts() {
    // Kivételkezelés:
    // A függvények hibáikat úgy jelezhetik, hogy kivételeket
    // dobnak. (throw new Error()) Ezek a kivételek (hibák) 
    // tovább mennek a függvényeken, amelyek meghívták őket,
    // amíg nem ütköznek egy try-catch blokkba, ha nem ütköznek,
    // akkor console-ra logolják, mi történt.
    
    // ide írjuk azt a részt, amely hibákat dobhat, bármely ponton
    try {
        let response = await fetch(url);

        if (!response.ok) {
            // itt is dobjunk hibát, ha abba ütközünk.
            throw new Error('A HTTP válasz nem volt 200 Ok.');
        }
    
        let data = await response.json();

        for (post of data) {
            // Alt Gr + 7 = `, ebbe az idézőjelbe írhatunk 
            // változókat.
            target.innerHTML += `
                <div class="card">
                    <div class="text">
                        <h1>${post.title}</h1>
                        <h2>${post.userId}</h2>
                        <p>${post.body}</p>
                    </div>
                </div>
            `;
        }
    // ide pedig ugrunk, ha bármilyen hibát elkapunk.
    } catch /* (error) <- nem kötelező, de így elérjük a hibát. */{
        target.innerHTML = `
            <div class="card">
                <div class="text">
                    <h1 class="red">Valami hiba történt</h1>
                </div>
            </div>
        `;
    }
}