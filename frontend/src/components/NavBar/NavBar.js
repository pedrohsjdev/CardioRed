import React from "react";
import "./NavBar.css";
import Logo from "../../assets/logo-navbar.svg";
import Logout from "../../assets/logout.svg";
import { BASE_URL_FRONTEND } from "../../utils/Consts";
import { logoutUser, userIsAdm, userIsAuthenticated } from "../../services/Login/LoginService";
import Notiflix from "notiflix";

const NavBar = ({ currentPage }) => {
    Notiflix.Notify.init({ closeButton: true });
    if (!userIsAuthenticated()) {
        return null;
    }

    const renderMedicoMenu = () => {
        if (userIsAdm()) {
            return (
                <li className="nav-item ms-5">
                    <a
                        className={`nav-item ${currentPage === "M" ? "active" : ""}`}
                        href={`${BASE_URL_FRONTEND}/medicos`}
                    >
                        Médicos
                    </a>
                </li>
            );
        }
    };
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light navbar-shadow">
                <div className="container-fluid container-page">
                    <a className="navbar-brand" href={`${BASE_URL_FRONTEND}/home`}>
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
                                <a
                                    className={`nav-item ${currentPage === "L" ? "active" : ""}`}
                                    href={`${BASE_URL_FRONTEND}/laudos`}
                                >
                                    Laudos
                                </a>
                            </li>
                            <li className="nav-item ms-5">
                                <a
                                    className={`nav-item ${currentPage === "C" ? "active" : ""}`}
                                    href={`${BASE_URL_FRONTEND}/consultas`}
                                >
                                    Consultas
                                </a>
                            </li>
                            <li className="nav-item ms-5">
                                <a
                                    className={`nav-item ${currentPage === "P" ? "active" : ""}`}
                                    href={`${BASE_URL_FRONTEND}/pacientes`}
                                >
                                    Pacientes
                                </a>
                            </li>
                            {renderMedicoMenu()}
                            <li className="nav-item ms-5">
                                <a className="nav-link" onClick={logoutUser} href={BASE_URL_FRONTEND}>
                                    <img className="logout-icon" src={Logout}></img>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
