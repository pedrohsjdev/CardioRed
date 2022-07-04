import React, { useState, useEffect } from "react";
import MedicosTable from "../components/Table/MedicosTable/MedicosTable";
import NavBar from "../components/NavBar/NavBar";
import Button from "../components/Button/Button";
import TableSearch from "../components/Table/TableSearch/TableSearch";
import TableCounter from "../components/Table/TableCounter/TableCounter";
import TablePaginator from "../components/Table/TablePaginator/TablePaginator";
import "./Pages.css";
import ModalView from "../components/Modal/ModalView/ModalView";
import ModalCreate from "../components/Modal/ModalCreate/ModalCreate";
import ModalUpdate from "../components/Modal/ModalUpdate/ModalUpdate";
import ModalDelete from "../components/Modal/ModalDelete/ModalDelete";
import FormCreateMedico from "../components/Form/FormMedico/FormCreateMedico/FormCreateMedico";
import FormUpdateMedico from "../components/Form/FormMedico/FormUpdateMedico/FormUpdateMedico";
import FormViewMedico from "../components/Form/FormMedico/FormViewMedico/FormViewMedico";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { userIsAuthenticated, userIsAdm } from "../services/Login/LoginService";
import { useNavigate } from "react-router-dom";
import { saveMedico, updateMedico, deleteMedico } from "../services/Medico/MedicoService";

const Medicos = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!userIsAuthenticated()) navigate("/");
        else if (!userIsAdm()) navigate("/home");
    }, []);

    const [startCrmTemporary, setStartCrmTemporary] = useState();
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [newMedicoData, setNewMedicoData] = useState({});
    const [medicoData, setMedicoData] = useState({});
    const [pageData, setPageData] = useState({});
    const [refreshMedicoTable, setRefreshMedicoTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const flushMedicoTable = () => {
        if (refreshMedicoTable) {
            setRefreshMedicoTable(false);
        } else {
            setRefreshMedicoTable(true);
        }
    };

    const saveMedicoData = async () => {
        const response = await saveMedico(newMedicoData);

        if (response.status == 201) {
            setShowModalCreate(false);
            flushMedicoTable();
            Notify.success("Medico cadastrado com sucesso!");
        } else {
            Notify.failure("Não foi possível cadastrar o médico!");
            console.error(response);
        }
    };

    const updateMedicoData = async () => {
        const response = await updateMedico(medicoData);

        if (response.status == 204) {
            setShowModalUpdate(false);
            flushMedicoTable();
            Notify.success("Medico atualizado com sucesso!");
        } else {
            Notify.failure("Não foi possível modificar o médico!");
            console.error(response);
        }
    };

    const deleteMedicoData = async () => {
        const response = await deleteMedico(medicoData.id);

        if (response.status == 204) {
            setShowModalDelete(false);
            setShowModalView(false);
            flushMedicoTable();
            Notify.success("Medico removido com sucesso!");
        } else {
            Notify.failure("Não foi possível remover o Medico.");
            console.error(response);
        }
    };

    const openModalCreate = () => {
        setShowModalCreate(true);
    };

    const openModalView = (data) => {
        setMedicoData(data);
        setShowModalView(true);
    };

    const openModalUpdate = () => {
        setShowModalUpdate(true);
        setStartCrmTemporary(medicoData.crm);
    };

    const openModalDelete = () => {
        // Open modal
        setShowModalDelete(true);
    };

    return (
        <>
            <NavBar currentPage="M" />
            <ModalCreate show={showModalCreate} setShow={setShowModalCreate} element="Médico">
                <FormCreateMedico
                    setShow={setShowModalCreate}
                    newMedicoData={newMedicoData}
                    setNewMedicoData={setNewMedicoData}
                    saveMedico={saveMedicoData}
                />
            </ModalCreate>

            <ModalUpdate show={showModalUpdate} setShow={setShowModalUpdate} element="Médico">
                <FormUpdateMedico
                    startCrmTemporary={startCrmTemporary}
                    setShow={setShowModalUpdate}
                    medicoData={medicoData}
                    setMedicoData={setMedicoData}
                    updateMedico={updateMedicoData}
                />
            </ModalUpdate>

            <ModalView
                show={showModalView}
                setShow={setShowModalView}
                openModalDelete={openModalDelete}
                openModalUpdate={openModalUpdate}
                element="Médico"
            >
                <FormViewMedico medicoData={medicoData} />
            </ModalView>

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                setShowModalView={setShowModalView}
                element="Médico"
                deleteElement={deleteMedicoData}
            />

            <div className="page-container">
                <h1 className="title-element">Listagem de Médicos</h1>
                <div className="d-flex justify-content-between">
                    <Button value="Cadastrar" action={openModalCreate} />
                    <TableSearch searchInput={searchInput} setSearchInput={setSearchInput} criteria="CRM" />
                </div>
                <MedicosTable
                    setPageData={setPageData}
                    openModalView={openModalView}
                    currentPage={currentPage}
                    searchInput={searchInput}
                    refreshMedicoTable={refreshMedicoTable}
                />
                <div className="d-flex justify-content-between mb-3">
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

export default Medicos;
