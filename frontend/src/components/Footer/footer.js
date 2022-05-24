import React from "react";
import "./style.css";
import Heart from "../../assets/coracao.svg";
import Github from "../../assets/github.svg";

const Footer = () => {
    return (
        <>
            <footer className="mt-5">
                <div className="container-fluid d-flex justify-content-between container-page footer-container">
                    <p className="footer-text">© 2022 CardioRed, Inc. Todos os direitos reservados.</p>
                    <a href="https://github.com/PrinceHard/CardioRed" target="_blank" >
                        <img src={Github} alt="logo_github" className="github" />
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer;