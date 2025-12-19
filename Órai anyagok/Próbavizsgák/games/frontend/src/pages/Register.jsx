import React from "react";

export default function Register() {
    async function registerUser(event) {
        event.preventDefault();
        
        try {
            const email = document.getElementById("email").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Nem sikerült regisztrálni: ${data.message}`);
            } else {
                alert("Sikeres regisztráció.");
            }
        } catch (err) {
            console.log(err);
            alert("Nem sikerült regisztrálni.");
        }
    }

    return (
        <form className="container" onSubmit={registerUser}>
            <div className="mb-3">
                <label for="email" className="form-label">E-mail cím</label>
                <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
                <label for="username" className="form-label">Felhasználónév</label>
                <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Jelszó</label>
                <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Regisztráció</button>
        </form>
    );
}