// getbootstrap.com/docs -> <Docs />
// getbootstrap.com/icons -> <Icons />
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Logout from "./pages/Logout.jsx";
import OwnedGames from "./pages/OwnedGames.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/logout"  element={<Logout />}></Route>
                <Route path="/owned_games" element={<OwnedGames />}></Route>
            </Routes>
        </BrowserRouter>
    );
}