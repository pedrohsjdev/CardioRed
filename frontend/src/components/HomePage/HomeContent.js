import React from "react";
import Heart from "../../assets/coracao.svg";
import "./style.css"

const HomeContent = () => {
    return (
        <div className="d-flex container-page mt-5">
            <div className="container">
                <div className="d-flex flex-column">
                    <h1>Sistema de Cardiologia</h1>
                    <p>Esse sistema foi desenvolvido utilizando as <br />seguintes tecnologias: </p>
                    <ul>
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
                    <p className="developers">Pedro Henrique, Rafael Dutra, Iago Sampaio <br/> e Leisson</p>
                </div>
            </div>
            <div className="container heart-container">
                <img src={Heart} className="heart-img"/>
            </div>
        </div>
    )
};

export default HomeContent;