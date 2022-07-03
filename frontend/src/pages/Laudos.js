import React, { useState, useEffect } from "react";
import LaudosTable from "../components/Table/LaudosTable/LaudosTable";
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
import FormCreateLaudo from "../components/Form/FormLaudo/FormCreateLaudo/FormCreateLaudo";
import FormUpdateLaudo from "../components/Form/FormLaudo/FormUpdateLaudo/FormUpdateLaudo";
import FormViewLaudo from "../components/Form/FormLaudo/FormViewLaudo/FormViewLaudo";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { userIsAuthenticated } from "../services/Login/LoginService";
import { useNavigate } from "react-router-dom";
import { saveLaudo, updateLaudo, deleteLaudo } from "../services/Laudo/LaudoService";

const Laudos = () => {
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
    const [newLaudoData, setNewLaudoData] = useState({});
    const [laudoData, setLaudoData] = useState({});
    const [pageData, setPageData] = useState({});
    const [refreshLaudoTable, setRefreshLaudoTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const flushLaudoTable = () => {
        if (refreshLaudoTable) {
            setRefreshLaudoTable(false);
        } else {
            setRefreshLaudoTable(true);
        }
    };

    const saveLaudoData = async () => {
        const response = await saveLaudo(newLaudoData);

        if (response.status == 201) {
            setShowModalCreate(false);
            flushLaudoTable();
            Notify.success("Laudo cadastrado com sucesso!");
        } else {
            Notify.failure("Não foi possível cadastrar o Laudo!");
            console.error(response);
        }
    };

    const updateLaudoData = async () => {
        const response = await updateLaudo(LaudoData);

        if (response.status == 204) {
            setShowModalUpdate(false);
            flushLaudoTable();
            Notify.success("Laudo atualizado com sucesso!");
        } else {
            Notify.failure("Não foi possível modificar o Laudo!");
            console.error(response);
        }
    };

    const deleteLaudoData = async () => {
        const response = await deleteLaudo(LaudoData.id);

        if (response.status == 204) {
            setShowModalDelete(false);
            setShowModalView(false);
            flushLaudoTable();
            Notify.success("Laudo removido com sucesso!");
        } else {
            Notify.failure("Não foi possível remover o Laudo.");
            console.error(response);
        }
    };

    const openModalCreate = () => {
        setShowModalCreate(true);
    };

    const openModalView = (data) => {
        setLaudoData(data);
        setShowModalView(true);
    };

    const openModalUpdate = () => {
        setShowModalUpdate(true);
    };

    const openModalDelete = () => {
        // Open modal
        setShowModalDelete(true);
    };

    return (
        <>
            <NavBar currentPage="L" />
            <ModalCreate show={showModalCreate} setShow={setShowModalCreate} element="Laudo">
                <FormCreateLaudo
                    setShow={setShowModalCreate}
                    newLaudoData={newLaudoData}
                    setNewLaudoData={setNewLaudoData}
                    saveLaudo={saveLaudoData}
                />
            </ModalCreate>
            <ModalUpdate show={showModalUpdate} setShow={setShowModalUpdate} element="Laudo">
                <FormUpdateLaudo
                    setShow={setShowModalUpdate}
                    laudoData={laudoData}
                    setLaudoData={setLaudoData}
                    updateLaudo={updateLaudoData}
                />
            </ModalUpdate>
            <ModalView
                show={showModalView}
                setShow={setShowModalView}
                openModalDelete={openModalDelete}
                openModalUpdate={openModalUpdate}
                element="Laudo"
            >
                <FormViewLaudo laudoData={laudoData} />
            </ModalView>
            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                setShowModalView={setShowModalView}
                element="Laudo"
                deleteElement={deleteLaudoData}
            />
            <div className="page-container">
                <h1 className="title-element">Listagem de Laudos</h1>
                <div className="d-flex justify-content-between">
                    <Button value="Cadastrar" action={openModalCreate} />
                    <TableSearch searchInput={searchInput} setSearchInput={setSearchInput} criteria="CPF do paciente" />
                </div>
                <LaudosTable
                    setPageData={setPageData}
                    openModalView={openModalView}
                    currentPage={currentPage}
                    searchInput={searchInput}
                    refreshLaudoTable={refreshLaudoTable}
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

export default Laudos;
