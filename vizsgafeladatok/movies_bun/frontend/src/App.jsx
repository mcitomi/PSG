import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        localStorage.getItem("token") && setLogged(true);
    }, []);

    return (
        <BrowserRouter>
            <Navbar logged={logged} setLogged={setLogged} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setLogged={setLogged} />} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </BrowserRouter>
    )
}