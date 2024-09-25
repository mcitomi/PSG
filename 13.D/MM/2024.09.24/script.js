function $(elementId) {
    return document.getElementById(elementId);
}

async function getPosts() {
    try {
        const request = await fetch("https://jsonplaceholder.typicode.com/posts");

        if(request.ok) {
            const body = await request.json();
            
            body.forEach(post => {
                document.getElementsByClassName("target")[0].innerHTML += `
                <div class="card">
                <div class="text">
                <h1>${post.title}</h1>
                <h2>felhasználó: ${post.userId}</h2>
                <p>${post.body}</p>
                </div></div>
                `;
            });
        } else {
            document.getElementsByClassName("target")[0].innerHTML += `
                <div class="card">
                <div class="text">
                <h1>Valami hiba történt</h1>
                </div></div>
            `;
            
            console.log(request);
        }
    } catch (error) {
        console.error(error);
    }
}

