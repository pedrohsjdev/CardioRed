import React, { useState } from "react";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import NavBar from "../components/Navbar/navbar";
import "./style.css";
import Register from "../components/registerButton/register";
import PacientesTable from "../components/PacientesTable/table";
import ModalCreate from "../components/Modal/Create/ModalCreate";
import ModalUpdate from "../components/Modal/Update/ModalUpdate";
import ModalView from "../components/Modal/View/ModalView";
import FormCreatePaciente from "../components/Form/FormPaciente/Create/FormCreatePaciente";
import FormUpdatePaciente from "../components/Form/FormPaciente/Update/FormUpdatePaciente";
import FormViewPaciente from "../components/Form/FormPaciente/View/FormViewPaciente";
import ModalDelete from "../components/Modal/Delete/ModalDelete";
import axios from "axios";
import authToken from "../utils/authToken";
import Paginator from "../components/Paginator/Paginator";

const Pacientes = () => {
    // State variables for open and close the modals.
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [searchInput, setSearchInput] = useState("");

    const [newPacienteData, setNewPacienteData] = useState({});
    const [pacienteData, setPacienteData] = useState({});
    const [pageData, setPageData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);

    const openModalCreate = () => {
        // Open modal
        setShowModalCreate(true);
    };

    const openModalView = (data) => {
        // Set clicked cell data to form inputs
        setPacienteData(data);
        console.log(pacienteData);
        // Open modal
        setShowModalView(true);
    };

    const openModalUpdate = () => {
        // Open modal
        setShowModalUpdate(true);
    };

    const openModalDelete = () => {
        // Open modal
        setShowModalDelete(true);
    };

    const handleSavePacienteError = (error) => {
        console.log(error.response);
    };

    const formatPacienteDataToUpdate = () => {
        setPacienteData({
            ...pacienteData,
            ["cpf"]: pacienteData.cpf.replaceAll(".", "").replace("-", ""),
        });
    };

    const savePaciente = () => {
        axios
            .post("http://localhost:8080/pacientes", newPacienteData)
            .then(() => {
                setNewPacienteData({});
                setShowModalCreate(false);
            })
            .catch((error) => {
                handleSavePacienteError(error);
            });
    };

    const updatePaciente = () => {
        axios
            .put("http://localhost:8080/pacientes", pacienteData)
            .then(() => {
                setShowModalUpdate(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deletePaciente = () => {
        axios
            .delete(`http://localhost:8080/pacientes/${pacienteData.id}`)
            .then(() => {
                setShowModalDelete(false);
                setShowModalView(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <NavBar />

            <ModalCreate
                show={showModalCreate}
                setShow={setShowModalCreate}
                element="Paciente"
            >
                <FormCreatePaciente
                    setShow={setShowModalCreate}
                    newPacienteData={newPacienteData}
                    setNewPacienteData={setNewPacienteData}
                    savePaciente={savePaciente}
                />
            </ModalCreate>

            <ModalUpdate
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                element="Paciente"
            >
                <FormUpdatePaciente
                    setShow={setShowModalUpdate}
                    pacienteData={pacienteData}
                    setPacienteData={setPacienteData}
                    updatePaciente={updatePaciente}
                />
            </ModalUpdate>

            <ModalView
                show={showModalView}
                setShow={setShowModalView}
                openModalDelete={openModalDelete}
                openModalUpdate={openModalUpdate}
                element="Paciente"
                formatPacienteDataToUpdate={formatPacienteDataToUpdate}
            >
                <FormViewPaciente pacienteData={pacienteData} />
            </ModalView>

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                setShowModalView={setShowModalView}
                element="Paciente"
                deletePaciente={deletePaciente}
            />

            <div className="page-container">
                <h1>Listagem de Pacientes</h1>
                <div className="d-flex justify-content-between">
                    <Register openModalCreate={openModalCreate} />
                    <FormSearch
                        setSearchInput={setSearchInput}
                        criteria="CPF"
                    />
                </div>

                <PacientesTable
                    setPageData={setPageData}
                    openModalView={openModalView}
                    currentPage={currentPage}
                    searchInput={searchInput}
                />
                <div className="d-flex justify-content-between">
                    <CounterElements
                        firstElement={pageData.empty === true ? 0 : 1}
                        lastElement={
                            pageData.empty === true
                                ? 0
                                : pageData.numberOfElements
                        }
                        totalElements={pageData.totalElements}
                    />

                    <Paginator
                        currentPage={currentPage}
                        totalPages={pageData.totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
};

export default Pacientes;
