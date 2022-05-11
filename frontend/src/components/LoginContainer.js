import React from "react";
import "./LoginContainer.css";

const LoginContainer = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <div className="logo-img">
            <img src={require("../assets/logo.svg")} alt="Cardio logo" />
          </div>

          <div className="login-img">
            <img src={require("../assets/img-login.svg")} alt="Login image" />
          </div>

          <div className="login-forms">
            <form action="" className="login" id="login-in">
              <h1 className="login-title">Login</h1>

              <div className="login-box">
                <input
                  type="text"
                  placeholder="Usuário"
                  className="login-input"
                />
              </div>

              <div className="login-box">
                <input
                  type="password"
                  placeholder="Senha"
                  class="login-input"
                />
              </div>

              <a href="#" className="login-button">
                Entrar
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginContainer;
