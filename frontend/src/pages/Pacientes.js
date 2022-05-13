import React from "react";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Pagination from "../components/Paginator/Pagination";
import NavBar from "../components/Navbar/navbar";
import "./style.css";
import Register from "../components/registerButton/register";
import PacientesTable from "../components/PacientesTable/table";

const Pacientes = () => {
    // Temporary test variables
    let pagesNumber = [1, 2, 3, 4, 5];

    return (
        <>
            <NavBar />
            <div className="page-container">
                <h1>Listagem de Pacientes</h1>
                <div className="d-flex justify-content-between">
                    <Register />
                    <FormSearch criteria="CPF" />
                </div>

                <PacientesTable />
                <div className="d-flex justify-content-between">
                    <CounterElements
                        firstElement={"1"}
                        lastElement={"10"}
                        totalElements={"57"}
                    />

                    <Pagination pagesNumber={pagesNumber} />
                </div>
            </div>
        </>
    );
};

export default Pacientes;
