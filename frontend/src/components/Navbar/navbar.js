import React from "react";
import "./style.css";
import Logo from '../../assets/logo-navbar.svg';

function NavBar() {
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-light navbar-shadow">
                <div class="container-fluid container-navbar">
                    <a class="navbar-brand" href="#" ><img src={Logo} /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="d-flex" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item ms-5">
                                <a class="nav-link" href="#">Laudos</a>
                            </li>
                            <li class="nav-item ms-5">
                                <a class="nav-link" href="#">Consultas</a>
                            </li>
                            <li class="nav-item ms-5">
                                <a class="nav-link" href="#">Pacientes</a>
                            </li>
                            <li class="nav-item ms-5">
                                <a class="nav-link" href="#">Médicos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;