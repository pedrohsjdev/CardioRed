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
import TablePaginator from "../components/Table/TablePaginator/TablePaginator";
import { userIsAuthenticated } from "../services/Login/LoginService";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import { savePaciente, updatePaciente, deletePaciente } from "../services/Paciente/PacienteService";
import { Loading } from "notiflix";

const Pacientes = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userIsAuthenticated()) {
            navigate("/");
        }
    }, []);

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [newPacienteData, setNewPacienteData] = useState({});
    const [pacienteData, setPacienteData] = useState({});
    const [pageData, setPageData] = useState({});
    const [refreshPacienteTable, setRefreshPacienteTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const flushPacienteTable = () => {
        if (refreshPacienteTable) {
            setRefreshPacienteTable(false);
        } else {
            setRefreshPacienteTable(true);
        }
    };

    const savePacienteData = async () => {
        Loading.circle();
        const response = await savePaciente(newPacienteData);

        if (response.status == 201) {
            Loading.remove();
            setShowModalCreate(false);
            flushPacienteTable();
            Notify.success("Paciente cadastrado com sucesso!");
        } else {
            Loading.remove();
            Notify.failure("Não foi possível cadastrar o paciente.");
            console.error(response);
        }
    };

    const updatePacienteData = async () => {
        Loading.circle();
        const response = await updatePaciente(pacienteData);

        if (response.status == 204) {
            Loading.remove();
            setShowModalUpdate(false);
            flushPacienteTable();
            Notify.success("As informações do paciente foram atualizadas com sucesso!");
        } else {
            Loading.remove();
            Notify.failure("Não foi possível atualizar as informações do paciente.");
            console.error(response);
        }
    };

    const deletePacienteData = async () => {
        Loading.circle();
        const response = await deletePaciente(pacienteData.id);

        if (response.status == 204) {
            Loading.remove();
            setShowModalDelete(false);
            setShowModalView(false);
            flushPacienteTable();
            Notify.success("Paciente removido com sucesso!");
        } else {
            Loading.remove();
            Notify.failure("Não foi possível remover o paciente.");
            console.error(response);
        }
    };

    const openModalCreate = () => {
        setNewPacienteData({});
        // Open modal
        setShowModalCreate(true);
    };

    const openModalView = (data) => {
        // Set clicked cell data to form inputs
        setPacienteData(data);
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

    return (
        <>
            <NavBar currentPage="P" />

            <ModalCreate show={showModalCreate} setShow={setShowModalCreate} element="Paciente">
                <FormCreatePaciente
                    setShow={setShowModalCreate}
                    newPacienteData={newPacienteData}
                    setNewPacienteData={setNewPacienteData}
                    savePaciente={savePacienteData}
                />
            </ModalCreate>

            <ModalUpdate show={showModalUpdate} setShow={setShowModalUpdate} element="Paciente">
                <FormUpdatePaciente
                    setShow={setShowModalUpdate}
                    pacienteData={pacienteData}
                    setPacienteData={setPacienteData}
                    updatePaciente={updatePacienteData}
                />
            </ModalUpdate>

            <ModalView setShow={setShowModalView} show={showModalView} element="Paciente">
                <FormViewPaciente
                    setShow={setShowModalView}
                    openModalDelete={openModalDelete}
                    openModalUpdate={openModalUpdate}
                    pacienteData={pacienteData}
                />
            </ModalView>

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                setShowModalView={setShowModalView}
                element="Paciente"
                deleteElement={deletePacienteData}
            />

            <div className="page-container">
                <h1 className="title-element">Listagem de Pacientes</h1>
                <div className="d-flex justify-content-between">
                    <Button value="Cadastrar" action={openModalCreate} />
                    <TableSearch searchInput={searchInput} setSearchInput={setSearchInput} criteria="CPF" />
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
