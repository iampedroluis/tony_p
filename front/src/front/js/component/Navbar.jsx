import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', darkMode);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/inicio">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/acerca-de">
                Acerca de
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              {/* Cambiar entre íconos de sol y luna según el modo actual */}
             <button className="bg-transparent border-0" onClick={toggleDarkMode}>
                {darkMode ? (
                  <i className="fas fa-moon text-gray-800"></i>
                ) : (
                  <i className="fas fa-sun text-yellow-500"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
