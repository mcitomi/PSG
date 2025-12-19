document.getElementById("registrationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error("Failed to register user.");
        }

        const data = await response.json();

        alert(data.message); // hiszen így küldjük vissza backendről
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
})

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error("Failed to register user.");
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);

        alert("Login succesful!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
})

async function fetchProfile() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Access denied.");
        }

        const response = await fetch("http://localhost:3000/profile", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to get username.");
        }

        const data = await response.json();

        console.log(data);

        alert(data.username);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}
