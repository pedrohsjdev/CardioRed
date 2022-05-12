import React from "react";
import "./LoginContainer.css";
import Logo  from '../../assets/logo.svg';
import LoginImg  from '../../assets/img-login.svg';

function LoginContainer () {
  return (
      <div className="login-container">
        <div className="login-content">
          <div className="logo-img">
            <img src={Logo}/>
          </div>

          <div className="login-img">
          <img src={LoginImg}/>
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
  );
};

export default LoginContainer;
