import React from "react";
import LoginContainer from "../components/Login/LoginContainer";

function Login(props) {
    return <LoginContainer setTokens={props.setTokens} />;
}

export default Login;
