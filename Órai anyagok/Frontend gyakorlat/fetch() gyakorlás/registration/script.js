function $(elementId) {
    return document.getElementById(elementId);
}

function getFirstElementByTag(elementName) {
    return document.getElementsByTagName(elementName)[0];
}

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(response.ok) {
            const body = await response.json();

            return body;
        } else {
            throw new Error("Hiba kérés közben");
        }
    } catch (error) {
        console.error(error);
        throw new Error("A szerver nem válaszolt");
    }
}

async function sendForm() {
    const users = await getUsers();

    if(!users) {
        return alert("A szerver elérése sikertelen!");
    }

    const name = $("nameInput").value;
    const email = $("emailInput").value;
    const userName = $("userInput").value;

    const lastPostId = users[users.length - 1].id;

    console.info(lastPostId, name, userName, email);
    
    const checkMail = users.find(user => user.email.toLowerCase() == email.toLowerCase());
    const checkUserName = users.find(user => user.username.toLowerCase() == userName.toLowerCase());

    console.info(checkMail, checkUserName);

    if(checkMail || checkUserName) {
        return alert("Ez az email cím vagy felhasználónév már regisztrált a rendszerünkben!");
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "post",
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            "id" : lastPostId + 1,
            "name": name,
            "email" : email,
            "username" : userName
        })
    });

    if(response.ok) {
        const body = await response.json();

        if(!body?.id || body.id != lastPostId + 1) {
            alert("A regisztráció meghiúsult!");
        }

        console.info(body);

        alert(`Sikeres regisztráció! \nAzonosítód: #${body.id}`);
        $("nameInput").value = $("emailInput").value = $("userInput").value = "";
    } else {
        alert("Hiba! Próbáld újra később!");
        console.error(body);
    }
}

getFirstElementByTag("form").addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm();
});