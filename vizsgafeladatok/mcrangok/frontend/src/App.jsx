import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Myrank from "./pages/Myrank.jsx";

export default () => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        localStorage.getItem("token") && setLogged(true);
    }, [])

    return (
        <BrowserRouter>
            <Navbar logged={logged} setLogged={setLogged} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/regisztracio" element={<Registration />} />
                <Route path="/bejelentkezes" element={<Login setLogged={setLogged}/>} />
                <Route path="/rangom" element={<Myrank />} />
            </Routes>
        </BrowserRouter>
    );
}