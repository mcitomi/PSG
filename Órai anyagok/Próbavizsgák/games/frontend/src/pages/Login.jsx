import React from "react";

export default function Login() {
    async function loginUser(event) {
        event.preventDefault();
        
        try {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Nem sikerült bejelentkezni: ${data.message}`);
            } else {
                localStorage.setItem("token", data.token);
                alert("Sikeres bejelentkezés.");
            }
        } catch (err) {
            console.log(err);
            alert("Nem sikerült bejelentkezni.");
        }
    }

    return (
        <form className="container" onSubmit={loginUser}>
            <div className="mb-3">
                <label for="username" className="form-label">Felhasználónév</label>
                <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Jelszó</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Bejelentkezés</button>
        </form>
    );
}