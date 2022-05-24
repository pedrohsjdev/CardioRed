import React from "react";
import "./style.css";

const Register = (props) => {
    return (
        <>
            <input
                className="btn btn-primary register-button mt-5"
                type="button"
                value="Cadastrar"
                onClick={() => props.openModalCreate()}
            ></input>
        </>
    );
};

export default Register;
