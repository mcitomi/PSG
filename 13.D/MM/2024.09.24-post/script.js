const resultElement = document.getElementById("result");
function $(elementId) {
    return document.getElementById(elementId);
}
async function sendTodo(titleName, descName) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "post",
            headers: {
                "Content-Type" : "application/json" // megadjuk hogy ez egy json lesz
            },
            body: `{    
                "title" : "${$(titleName).value}",
                "body" : "${$(descName).value}",
                "userId" : 1
            }`  // a body mindig szövegként kell megadni, de ez valojaban egy json
        });

        console.log(response);
        const data = await response.json();
        console.log(data);
        
        resultElement.innerHTML = `
        <div class="todo">
            <label for="title">📝 Feladat:</label>
            <input type="text" name="title" value="${data.title}" disabled>
            <label for="desc">Leírás</label>
            <textarea name="desc" disabled>${data.body}</textarea>
        </div>` + resultElement.innerHTML;
        
        $(titleName).value = "";
        $(descName).value = "";
    } catch (error) {
        console.log(error);
        resultElement.innerHTML = "Valami hiba történt";
    }
}

async function getAll() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");

        if(response.ok) {
            const data = await response.json();

            data.forEach(todo => {
                resultElement.innerHTML = `
                <div class="todo">
                    <label for="title">✏️ Feladat:</label>
                    <input type="text" name="title" value="${todo.title}" disabled>
                    <label for="desc">Elvégzett?</label>
                    <textarea name="desc" disabled>${JSON.parse(todo.completed) ? "✅ Igen" : "❌ Nem"}</textarea>
                </div>
                ` + resultElement.innerHTML;
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

document.getElementById("todoForm").addEventListener('submit', (event) => {
    event.preventDefault();
    sendTodo("title", "desc");
});