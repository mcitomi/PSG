import React, { useEffect } from "react";

export default function Logout() {
    useEffect(() => {
        localStorage.removeItem("token");
        alert("Sikeres kijelentkezés.");
    }, []);

    return (
        <h1 className="text-center">Kijelentkezés</h1>
    )
}