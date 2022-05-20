import React, { useState, useEffect } from "react";
import MedicosTable from "../components/MedicosTable/table";
import NavBar from "../components/Navbar/navbar";
import Register from "../components/registerButton/register";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Pagination from "../components/Paginator/Pagination"
import "./style.css";
import ModalCreateAndUpdate from "../components/Modal/CreateAndUpdate/ModalCreateAndUpdate";
import FormMedico from "../components/Form/FormMedico/FormMedico";
import ModalView from "../components/Modal/View/ModalView";
import ModalDelete from "../components/Modal/Delete/ModalDelete";
import axios from "axios";


const Medicos = () => {

    const [medicos, setMedicos] = useState([{}])

    const [pageInfo, setPageInfo] = useState({})

    useEffect(() => {
        const getMedicos = async () => {
            await axios.get(`http://localhost:8080/medicos?size=3&page=${pageNumber}&sort=name`)
                .then((response) => {
                    setMedicos(response.data.content)
                    setPageInfo(response.data)
                    console.log(response.data.totalPages)
                }
                );
        }
        getMedicos()
    }, [pageNumber])
    // State variables for open and close the modals.
    const [showModalCreateAndUpdate, setShowModalCreateAndUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    // State variable for store paciente data to be displayed on modal.
    const [formData, setFormData] = useState({});

    const [modalTitle, setModalTitle] = useState("");

    // Temporary test variables
    const [pageNumber, setPageNumber] = useState(0);

    const [saveAttempt, setSaveAttempt] = useState(false);

    const updatePageNumber = (number) => {
        setPageNumber(number)
        getMedicos(number)
    }

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
        setModalTitle("Modificar Médico");
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
                setSaveAttempt={setSaveAttempt} >
                <FormMedico data={formData} saveAttempt={saveAttempt} />
            </ModalCreateAndUpdate>

            <ModalView
                show={showModalView}
                setShow={setShowModalView}
                openModalDelete={openModalDelete}
                openModalUpdate={openModalUpdate}
                title="Médico">
                <FormMedico disabled={true} data={formData} />
            </ModalView>

            <ModalDelete
                show={showModalDelete}
                setShow={setShowModalDelete}
                element="Médico" />

            <div className="page-container">
                <h1>Listagem de Médicos</h1>
                <div className="d-flex justify-content-between">
                    <Register openModalCreate={openModalCreate} />
                    <FormSearch criteria={"CRM"} />
                </div>
                <MedicosTable openModalView={openModalView} medicos={medicos} pageInfo={pageInfo} />
                <div className="d-flex justify-content-between mb-3">
                    <CounterElements firstElement={"1"} lastElement={"10"} totalElements={"57"} />
                    <Pagination pageInfo={pageInfo} updatePageNumber={updatePageNumber} pageNumber={pageNumber} />
                </div>
            </div>
        </>
    );
};

export default Medicos;