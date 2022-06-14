import React, { useState, useEffect } from "react";
import TableSearch from "../components/Table/TableSearch/TableSearch";
import TableCounter from "../components/Table/TableCounter/TableCounter";
import NavBar from "../components/NavBar/NavBar";
import "./Pages.css";
import Button from "../components/Button/Button";
import PacientesTable from "../components/Table/PacientesTable/PacientesTable";
import ModalCreate from "../components/Modal/ModalCreate/ModalCreate";
import ModalUpdate from "../components/Modal/ModalUpdate/ModalUpdate";
import ModalView from "../components/Modal/ModalView/ModalView";
import FormCreatePaciente from "../components/Form/FormPaciente/FormCreatePaciente/FormCreatePaciente";
import FormUpdatePaciente from "../components/Form/FormPaciente/FormUpdatePaciente/FormUpdatePaciente";
import FormViewPaciente from "../components/Form/FormPaciente/FormViewPaciente/FormViewPaciente";
import ModalDelete from "../components/Modal/ModalDelete/ModalDelete";
import axios from "axios";
import TablePaginator from "../components/Table/TablePaginator/TablePaginator";
import { userIsAuthenticated } from "../services/Login/LoginService";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Consts";

const Pacientes = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userIsAuthenticated()) {
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
                Notify.success("As informações do paciente foram atualizadas com sucesso!");
            })
            .catch((error) => {
                Notify.failure("Não foi possível atualizar as informações do paciente.");
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

            <ModalCreate show={showModalCreate} setShow={setShowModalCreate} element="Paciente">
                <FormCreatePaciente
                    setShow={setShowModalCreate}
                    newPacienteData={newPacienteData}
                    setNewPacienteData={setNewPacienteData}
                    savePaciente={savePaciente}
                />
            </ModalCreate>

            <ModalUpdate show={showModalUpdate} setShow={setShowModalUpdate} element="Paciente">
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
                <h1 className="title-element">Listagem de Pacientes</h1>
                <div className="d-flex justify-content-between">
                    <Button value="Cadastrar" action={openModalCreate} />
                    <TableSearch setSearchInput={setSearchInput} criteria="CPF" />
                </div>

                <PacientesTable
                    setPageData={setPageData}
                    openModalView={openModalView}
                    currentPage={currentPage}
                    searchInput={searchInput}
                    refreshPacienteTable={refreshPacienteTable}
                />
                <div className="d-flex justify-content-between">
                    <TableCounter
                        firstElement={pageData.empty === true ? 0 : 1}
                        lastElement={pageData.empty === true ? 0 : pageData.numberOfElements}
                        totalElements={pageData.totalElements}
                    />

                    <TablePaginator
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
