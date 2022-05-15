import React, { useState } from "react";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Pagination from "../components/Paginator/Pagination";
import NavBar from "../components/Navbar/navbar";
import "./style.css";
import Register from "../components/registerButton/register";
import PacientesTable from "../components/PacientesTable/table";
import Modal from "../components/Modal/Modal";
import FormPaciente from "../components/FormPaciente/FormPaciente";

const Pacientes = () => {
    const [showModal, setShowModal] = useState(false);

    // Temporary test variables
    const pagesNumber = [1, 2, 3, 4, 5];

    return (
        <>
            <NavBar />

            <Modal
                title="Cadastrar Paciente"
                leftButtonText="Cancelar"
                rightButtonText="Concluir"
                show={showModal}
                setShow={setShowModal}
            >
                <FormPaciente />
            </Modal>

            <div className="page-container">
                <h1>Listagem de Pacientes</h1>
                <div className="d-flex justify-content-between">
                    <Register setShowModal={setShowModal} />
                    <FormSearch criteria="CPF" />
                </div>

                <PacientesTable setShowModal={setShowModal} />
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
