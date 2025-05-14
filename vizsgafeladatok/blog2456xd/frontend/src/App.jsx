import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Reg from "./pages/Register";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";

export default () => {
    return (
        <BrowserRouter>
        <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/reg" element={<Reg/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}