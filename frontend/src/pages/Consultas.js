import React, { useState, useEffect } from "react";
import ConsultasTable from "../components/Table/ConsultasTable/ConsultasTable";
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
import FormCreateConsulta from "../components/Form/FormConsulta/FormCreateConsulta/FormCreateConsulta";
import FormUpdateConsulta from "../components/Form/FormConsulta/FormUpdateConsulta/FormUpdateConsulta";
import FormViewConsulta from "../components/Form/FormConsulta/FormViewConsulta/FormViewConsulta";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { userIsAuthenticated } from "../services/Login/LoginService";
import { useNavigate } from "react-router-dom";
import {
    saveConsulta,
    updateConsulta,
    deleteConsulta,
    toPostConsulta,
    generatePDF,
} from "../services/Consulta/ConsultaService";
import { Loading } from "notiflix";

const Consultas = () => {
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
    const [newConsultaData, setNewConsultaData] = useState({});
    const [consultaData, setConsultaData] = useState({});
    const [pageData, setPageData] = useState({});
    const [refreshConsultaTable, setRefreshConsultaTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const flushConsultaTable = () => {
        if (refreshConsultaTable) {
            setRefreshConsultaTable(false);
        } else {
            setRefreshConsultaTable(true);
        }
    };
    const saveConsultaData = async () => {
        Loading.circle();
        const postConsulta = await toPostConsulta(newConsultaData, "post");

        const requestSave = saveConsulta(postConsulta);

        requestSave.then(
            () => {
                Loading.remove();
                setShowModalCreate(false);
                flushConsultaTable();
                Notify.success("Consulta cadastrada com sucesso!");
                generatePDF(newConsultaData.paciente.name, newConsultaData.dateTime);
            },
            (err) => {
                Loading.remove();
                Notify.failure("Não foi possível cadastrar a consulta!");
                console.error(err);
            }
        );
    };

    const updateConsultaData = async () => {
        Loading.circle();
        const response = await updateConsulta(consultaData).catch((e) => {
            Loading.remove();
            Notify.failure("Não foi possível modificar a consulta!");
        });

        if (response.status == 204) {
            setShowModalUpdate(false);
            flushConsultaTable();
            Loading.remove();
            Notify.success("Consulta atualizada com sucesso!");
        }
    };

    const deleteConsultaData = async () => {
        Loading.circle();
        const response = await deleteConsulta(consultaData.id);

        if (response.status == 204) {
            Loading.remove();
            setShowModalDelete(false);
            setShowModalView(false);
            flushConsultaTable();
            Notify.success("Consulta removida com sucesso!");
        } else {
            Loading.remove();
            Notify.failure("Não foi possível remover a Consulta.");
            console.error(response);
        }
    };

    const openModalCreate = () => {
        setNewConsultaData({});
        setShowModalCreate(true);
    };

    const openModalView = (data) => {
        setConsultaData(data);
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
            <NavBar currentPage="C" />
            <ModalCreate show={showModalCreate} setShow={setShowModalCreate} element="Consulta">
                <FormCreateConsulta
                    setShow={setShowModalCreate}
                    newConsultaData={newConsultaData}
                    setNewConsultaData={setNewConsultaData}
                    saveConsulta={saveConsultaData}
                />
            </ModalCreate>
            <ModalUpdate show={showModalUpdate} setShow={setShowModalUpdate} element="Consulta">
                <FormUpdateConsulta
                    setShow={setShowModalUpdate}
                    consultaData={consultaData}
                    setConsultaData={setConsultaData}
                    updateConsulta={updateConsultaData}
                />
            </ModalUpdate>
            <ModalView setShow={setShowModalView} show={showModalView} element="Consulta">
                <FormViewConsulta
                    openModalDelete={openModalDelete}
                    openModalUpdate={openModalUpdate}
                    setConsultaData={setConsultaData}
                    setShow={setShowModalView}
                    consultaData={consultaData}
                />
            </ModalView>
            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                setShowModalView={setShowModalView}
                element="Consulta"
                deleteElement={deleteConsultaData}
            />
            <div className="page-container">
                <h1 className="title-element">Listagem de Consultas</h1>
                <div className="d-flex justify-content-between">
                    <Button value="Cadastrar" action={openModalCreate} />
                    <TableSearch
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        criteria={"CPF ou nome do paciente"}
                    />
                </div>
                <ConsultasTable
                    setPageData={setPageData}
                    openModalView={openModalView}
                    currentPage={currentPage}
                    searchInput={searchInput}
                    refreshConsultaTable={refreshConsultaTable}
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

export default Consultas;
