import React, { useState, useEffect } from "react";
import MedicosTable from "../components/Modal/MedicosTable/table";
import NavBar from "../components/Navbar/navbar";
import Register from "../components/registerButton/register";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Paginator from "../components/Paginator/Paginator";
import "./style.css";
import axios from "axios";
import ModalView from "../components/Modal/View/ModalView";
import ModalCreate from "../components/Modal/Create/ModalCreate";
import ModalUpdate from "../components/Modal/Update/ModalUpdate";
import ModalDelete from "../components/Modal/Delete/ModalDelete";
import FormCreateMedico from "../components/Form/FormMedico/Create/FormCreateMedico";
import FormUpdateMedico from "../components/Form/FormMedico/Update/FormUpdateMedico";
import FormViewMedico from "../components/Form/FormMedico/View/FormViewMedico";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import userAuth from "../utils/userAuth";
import { useNavigate } from "react-router-dom";


const Medicos = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!userAuth()) {
            navigate("/");
        }
    }, []);

    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [newMedicoData, setNewMedicoData] = useState({});
    const [medicoData, setMedicoData] = useState({});
    const [pageData, setPageData] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [refreshMedicoTable, setRefreshMedicoTable] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const saveMedico = async () => {
        const response = await axios
            .post("http://localhost:8080/medicos", newMedicoData)
            .then(response => {
                console.log(response)
                Notify.success("Medico cadastrado com sucesso!")
            }).catch(error => {
                console.log(error)
                Notify.failure("Não foi possível cadastar o médico!")
            })
    }

    const updateMedico = async () => {
        console.log("dados do medico" + medicoData.password)
        const response = await axios
            .put("http://localhost:8080/medicos", medicoData)
            .then(() => {
                Notify.success("Medico atualizado com sucesso!")
                flushMedicoTable();
            }).catch(error => {
                console.log(error)
                Notify.failure("Não foi possível modificar o médico!")
            })
    }

    const deleteMedico = () => {
        axios
            .delete(`http://localhost:8080/medicos?id=${medicoData.id}`)
            .then(() => {
                setShowModalDelete(false);
                setShowModalView(false);
                flushMedicoTable();
                Notify.success("Medico removido com sucesso!");
            })
            .catch((error) => {
                Notify.failure("Não foi possível remover o Medico.");
                console.error(error);
            });
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
    };

    const openModalDelete = () => {
        // Open modal
        setShowModalDelete(true);
    };

    const flushMedicoTable = () => {
        if (refreshMedicoTable) {
            setRefreshMedicoTable(false);
        } else {
            setRefreshMedicoTable(true);
        }
    };

    return (
        <>
            <NavBar />
            <ModalCreate
                show={showModalCreate}
                setShow={setShowModalCreate}
                element="Médico"
            >
                <FormCreateMedico
                    setShow={setShowModalCreate}
                    newMedicoData={newMedicoData}
                    setNewMedicoData={setNewMedicoData}
                    saveMedico={saveMedico}
                />
            </ModalCreate>

            <ModalUpdate
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                element="Médico"
            >
                <FormUpdateMedico
                    setShow={setShowModalUpdate}
                    medicoData={medicoData}
                    setMedicoData={setMedicoData}
                    updateMedico={updateMedico}
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
                deleteElement={deleteMedico}
            />

            <div className="page-container">
                <h1>Listagem de Médicos</h1>
                <div className="d-flex justify-content-between">
                    <Register openModalCreate={openModalCreate} />
                    <FormSearch criteria={"CRM"} />
                </div>
                <MedicosTable setPageData={setPageData}
                    openModalView={openModalView}
                    currentPage={currentPage}
                    searchInput={searchInput}
                    refreshMedicoTable={refreshMedicoTable} />
                <div className="d-flex justify-content-between mb-3">
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

export default Medicos;