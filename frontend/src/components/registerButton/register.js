import React from "react";
import "./style.css";

const Register = (props) => {
    return (
        <>
            <input
                className="btn btn-primary register-button mt-5"
                type="button"
                value="Cadastrar"
                onClick={() => props.setShowModal(true)}
            ></input>
        </>
    );
};

export default Register;
