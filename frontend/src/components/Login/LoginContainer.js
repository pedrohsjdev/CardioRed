import React, { useState } from "react";
import "./LoginContainer.css";
import Logo from "../../assets/logo.svg";
import LoginImg from "../../assets/img-login.svg";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function LoginContainer(props) {
    // Request post to authenticate user
    const loginAttempt = async () => {
        const response = await axios
            .post(
                "http://localhost:8080/login",
                qs.stringify({
                    username: inputs.username,
                    password: inputs.password,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then(loginSuccessfull)
            .catch((error) => console.error(error));
    };

    // Function to redirect the user to home page and set user tokens
    const navigate = useNavigate();
    const loginSuccessfull = (response) => {
        localStorage.setItem("jwt_tokens", response.data);
        navigate("/home");
    };

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    // Function to change the inputs states variables
    const inputChange = (event) => {
        const { name, value } = event.target;
        setInputs({ ...inputs, [name]: value });
    };

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
                            <form action="" className="login" id="login-in">
                                <h1 className="login-title">Login</h1>

                                <div className="login-box">
                                    <input
                                        type="text"
                                        placeholder="Usuário"
                                        className="login-input"
                                        name="username"
                                        onChange={inputChange}
                                    />
                                </div>

                                <div className="login-box">
                                    <input
                                        type="password"
                                        placeholder="Senha"
                                        className="login-input"
                                        name="password"
                                        onChange={inputChange}
                                    />
                                </div>

                                <a
                                    href="#"
                                    className="login-button"
                                    onClick={loginAttempt}
                                >
                                    Entrar
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginContainer;
