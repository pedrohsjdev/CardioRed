import React from "react";
import "./Footer.css";
import GitHub from "../../assets/git-hub.svg";

const Footer = () => {
    return (
        <>
            <footer className="mt-5 footer-main-page">
                <div className="container-fluid d-flex justify-content-between container-page footer-container">
                    <p className="footer-text">© 2022 CardioRed, Inc. Todos os direitos reservados.</p>
                    <a href="https://github.com/PrinceHard/CardioRed" target="_blank">
                        <img src={GitHub} alt="logo-github" className="github" />
                    </a>
                </div>
            </footer>
        </>
    );
};

export default Footer;
