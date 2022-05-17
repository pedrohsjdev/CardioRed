import React, { useState } from "react";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Pagination from "../components/Paginator/Pagination";
import NavBar from "../components/Navbar/navbar";
import "./style.css";
import Register from "../components/registerButton/register";
import PacientesTable from "../components/PacientesTable/table";
import ModalCreateAndUpdate from "../components/Modal/CreateAndUpdate/ModalCreateAndUpdate";
import ModalView from "../components/Modal/View/ModalView";
import FormPaciente from "../components/Form/FormPaciente/FormPaciente";
import ModalDelete from "../components/Modal/Delete/ModalDelete";

const Pacientes = () => {
    // State variables for open and close the modals.
    const [showModalCreateAndUpdate, setShowModalCreateAndUpdate] =
        useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    // State variable for store paciente data to be displayed on modal.
    const [formData, setFormData] = useState({});

    const [modalTitle, setModalTitle] = useState("");

    // Temporary test variables
    const pagesNumber = [1, 2, 3, 4, 5];

    const openModalCreate = () => {
        // Clean inputs
        setFormData({});
        setModalTitle("Cadastrar Paciente");
        // Open modal
        setShowModalCreateAndUpdate(true);
    };

    const openModalView = (data) => {
        // Set clicked cell data to form inputs
        setFormData(data);
        // Open modal
        setShowModalView(true);
    };

    const openModalUpdate = () => {
        setModalTitle("Modificar Paciente");
        // Open modal
        setShowModalCreateAndUpdate(true);
    };

    const openModalDelete = () => {
        // Open modal
        setShowModalDelete(true);
    };

    return (
        <>
            <NavBar />

            <ModalCreateAndUpdate
                show={showModalCreateAndUpdate}
                setShow={setShowModalCreateAndUpdate}
                title={modalTitle}
            >
                <FormPaciente disabled={false} data={formData} />
            </ModalCreateAndUpdate>

            <ModalView
                show={showModalView}
                setShow={setShowModalView}
                openModalDelete={openModalDelete}
                openModalUpdate={openModalUpdate}
                title="Paciente"
            >
                <FormPaciente disabled={true} data={formData} />
            </ModalView>

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                element="Paciente"
            />

            <div className="page-container">
                <h1>Listagem de Pacientes</h1>
                <div className="d-flex justify-content-between">
                    <Register openModalCreate={openModalCreate} />
                    <FormSearch criteria="CPF" />
                </div>

                <PacientesTable openModalView={openModalView} />
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
