import React from "react";
import Heart from "../../assets/heart.svg";
import "./HomeContent.css";

const HomeContent = () => {
    return (
        <div className="d-flex container-page home-content">
            <div className="container">
                <div className="d-flex flex-column">
                    <h1 className="home-title">Hospital Universitário IFBA</h1>
                    <p className="home-description">
                        Esse sistema foi desenvolvido utilizando as <br />
                        seguintes tecnologias:{" "}
                    </p>
                    <ul className="list-content-home">
                        <li>Spring Boot</li>
                        <li>JPA</li>
                        <li>Hibernate</li>
                        <li>React JS</li>
                        <li>Heroku</li>
                        <li>PostgreSQL</li>
                        <li>Netlify</li>
                        <li>Bootstrap</li>
                    </ul>
                </div>
                <div className="mb-3">
                    <h1 className="mt-3">Desenvolvedores</h1>
                    <p className="developers">
                        Pedro Henrique, Rafael Dutra, Iago Sampaio <br /> e Leisson Gomes
                    </p>
                </div>
            </div>
            <div className="container heart-container">
                <img src={Heart} className="heart-img" />
            </div>
        </div>
    );
};

export default HomeContent;
