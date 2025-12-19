import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Webshop</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Főoldal</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Bejelentkezés</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Regisztráció</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Webshop</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Főoldal</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/owned_games" className="nav-link">Saját játékaim</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Kijelentkezés</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
    
}