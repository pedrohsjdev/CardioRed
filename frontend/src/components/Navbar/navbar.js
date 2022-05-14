import React from "react";
import "./style.css";
import Logo from "../../assets/logo-navbar.svg";

function NavBar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light navbar-shadow">
                <div className="container-fluid container-page">
                    <a className="navbar-brand" href="#">
                        <img src={Logo} />
                    </a>
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
                    <div className="d-flex" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">
                                    Laudos
                                </a>
                            </li>
                            <li className="nav-item ms-5">
                                <a className="nav-link" href="#">
                                    Consultas
                                </a>
                            </li>
                            <li className="nav-item ms-5">
                                <a
                                    className="nav-link"
                                    href="http://localhost:8080/pacientes"
                                >
                                    Pacientes
                                </a>
                            </li>
                            <li className="nav-item ms-5">
                                <a
                                    className="nav-link"
                                    href="http://localhost:8080/medicos"
                                >
                                    Médicos
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
