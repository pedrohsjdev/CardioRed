import React from "react";
import "./Button.css";

const Button = ({ value, action }) => {
    return (
        <>
            <button className="btn btn-generic btn-primary mt-5" onClick={() => action()}>
                {value}
            </button>
        </>
    );
};

export default Button;
