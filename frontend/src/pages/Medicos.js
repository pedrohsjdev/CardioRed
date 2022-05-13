import React from "react";
import NavBar from "../components/Navbar/navbar";
import Register from "../components/registerButton/register";

const Medicos = () => {
    return (
        <>
            <NavBar/>
            <h1>Listagem de Médicos</h1>
            <Register/>
        </>
    )
}

export default Medicos;