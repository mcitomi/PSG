import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";

import Navbar from "./components/Navbar.jsx";

import "./styles/main.css";

export default () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}