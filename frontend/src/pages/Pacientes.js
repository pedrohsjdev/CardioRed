import React, { useState, useEffect } from "react";
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
import Paginator from "../components/Paginator/Paginator";
import userAuth from "../utils/userAuth";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Consts";

const Pacientes = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userAuth()) {
            navigate("/");
        }
    }, []);
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

    const [refreshPacienteTable, setRefreshPacienteTable] = useState(false);

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

    const formatPacienteDataToUpdate = () => {
        setPacienteData({
            ...pacienteData,
            ["cpf"]: pacienteData.cpf.replaceAll(".", "").replace("-", ""),
        });
    };

    const flushPacienteTable = () => {
        if (refreshPacienteTable) {
            setRefreshPacienteTable(false);
        } else {
            setRefreshPacienteTable(true);
        }
    };

    const savePaciente = () => {
        axios
            .post(`${BASE_URL}/pacientes`, newPacienteData)
            .then(() => {
                setShowModalCreate(false);
                flushPacienteTable();
                Notify.success("Paciente cadastrado com sucesso!");
            })
            .catch((error) => {
                Notify.failure("Não foi possível cadastrar o paciente.");
                console.log(error);
            });
    };

    const updatePaciente = () => {
        axios
            .put(`${BASE_URL}/pacientes`, pacienteData)
            .then(() => {
                setShowModalUpdate(false);
                flushPacienteTable();
                Notify.success(
                    "As informações do paciente foram atualizadas com sucesso!"
                );
            })
            .catch((error) => {
                Notify.failure(
                    "Não foi possível atualizar as informações do paciente."
                );
                console.error(error);
            });
    };

    const deletePaciente = () => {
        axios
            .delete(`${BASE_URL}/pacientes/${pacienteData.id}`)
            .then(() => {
                setShowModalDelete(false);
                setShowModalView(false);
                flushPacienteTable();
                Notify.success("Paciente removido com sucesso!");
            })
            .catch((error) => {
                Notify.success("Não foi possível remover o paciente.");
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
                formatDataToUpdate={formatPacienteDataToUpdate}
            >
                <FormViewPaciente pacienteData={pacienteData} />
            </ModalView>

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                setShowModalView={setShowModalView}
                element="Paciente"
                deleteElement={deletePaciente}
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
                    refreshPacienteTable={refreshPacienteTable}
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
