import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Favs from "./pages/Favs.jsx";

import Navbar from "./components/Navbar.jsx";

export default () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            setLogged(true);
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <Navbar logged={logged} setLogged={setLogged}/>
                <Routes>
                    <Route path="/" element={<Home logged={logged}/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setLogged={setLogged} />} />
                    <Route path="/favs" element={<Favs />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}