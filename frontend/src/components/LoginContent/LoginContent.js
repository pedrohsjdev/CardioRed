import React, { useState, useEffect } from "react";
import "./LoginContent.css";
import Logo from "../../assets/logo.svg";
import LoginImg from "../../assets/login-img.svg";
import { useNavigate } from "react-router-dom";
import { userIsAuthenticated, saveTokens, loginRequest } from "../../services/Login/LoginService";
import { Notify } from "notiflix";

const LoginContent = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (userIsAuthenticated()) {
            navigate("/home");
        }
    }, []);

    const attemptLogin = async () => {
        const response = await loginRequest(inputs);

        if (response.status == 200) {
            Notify.success("Login efetuado com sucesso!", {
                closeButton: true,
            });
            saveTokens(response.data);
            setTimeout(navigate("/home"), 2500);
        } else if (response.status == 401) {
            Notify.failure("Não foi possível efetuar o login.");
            setCredentialsValidated(false);
        } else {
            Notify.failure("Servidor indisponível.");
        }
    };

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    // Function to change the inputs states variables
    const inputChange = (event) => {
        setCredentialsValidated(true);
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

    const [credentialsValidated, setCredentialsValidated] = useState(true);

    return (
        <>
            <div className="logo-content">
                <div className="logo-img">
                    <img src={Logo} />
                </div>
            </div>
            <div className="login-outer">
                <div className="login-middle">
                    <div className="login-inner">
                        <div className="login-img">
                            <img src={LoginImg} />
                        </div>

                        <div className="login-forms">
                            <form
                                action=""
                                className={"login " + (credentialsValidated ? "" : "invalid")}
                                id="login-in"
                            >
                                <h1 className="login-title">Login</h1>

                                <div className="login-box">
                                    <div className={"error-info-div " + (credentialsValidated ? "" : "show-message")}>
                                        <p className="valitation-message ">Credenciais inválidas!</p>
                                    </div>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Usuário"
                                        className={"login-input " + (credentialsValidated ? "" : "invalid")}
                                        name="username"
                                        onChange={inputChange}
                                    />
                                </div>

                                <div className="login-box">
                                    <input
                                        autoComplete="off"
                                        type="password"
                                        placeholder="Senha"
                                        className={"login-input " + (credentialsValidated ? "" : "invalid")}
                                        name="password"
                                        onChange={inputChange}
                                    />
                                </div>

                                <a href="#" className="login-button" onClick={attemptLogin}>
                                    Entrar
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginContent;
