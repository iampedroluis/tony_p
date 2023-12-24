import React, { useContext, useState } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { Context } from "../store/appContext";
import nblanco from "../../img/nblanco.png"

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark', darkMode);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
            <div className="container mx-5">
                <Link className="navbar-brand" to="/">
                    <img src={nblanco} className="logo-nav" href="/"></img>
                </Link>
                <button
                    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white font-extralight" to="/registro">
                                registrarse
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link  text-white font-extralight" to="/">
                                iniciar sesion
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            {/* Cambiar entre íconos de sol y luna según el modo actual */}
                            <button className="bg-transparent border-0" onClick={toggleDarkMode}>
                                {darkMode ? (
                                    <i className="fas fa-moon text-dark-black"></i>
                                ) : (
                                    <i className="fas fa-sun text-dark-black"></i>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
