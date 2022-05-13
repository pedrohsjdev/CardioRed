import React from "react";
import MedicosTable from "../components/MedicosTable/table";
import NavBar from "../components/Navbar/navbar";
import Register from "../components/registerButton/register";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Pagination from "../components/Paginator/Pagination"
import "./style.css";

const Medicos = () => {
    let pagesNumber = [1, 2, 3, 4, 5];

    return (
        <>
            <NavBar />
            <div className="page-container">
                <h1>Listagem de Médicos</h1>
                <div className="d-flex justify-content-between">
                    <Register />
                    <FormSearch criteria={"CRM"}/>
                </div>
                <MedicosTable />
                <div className="d-flex justify-content-between">
                    <CounterElements firstElement={"1"} lastElement={"10"} totalElements={"57"}/>
                    <Pagination pagesNumber={pagesNumber}/>
                </div>
            </div>
        </>
    )
}

export default Medicos;