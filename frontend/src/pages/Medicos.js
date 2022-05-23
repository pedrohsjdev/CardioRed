import React, { useState, useEffect } from "react";
import MedicosTable from "../components/MedicosTable/table";
import NavBar from "../components/Navbar/navbar";
import Register from "../components/registerButton/register";
import FormSearch from "../components/SearchBar/FormSearch";
import CounterElements from "../components/TableCounter/CounterElements";
import Pagination from "../components/Paginator/Pagination"
import "./style.css";
import FormMedico from "../components/Form/FormMedico/FormMedico";
import ModalView from "../components/Modal/View/ModalView";
import ModalDelete from "../components/Modal/Delete/ModalDelete";
import axios from "axios";
import { toast } from "react-toastify";
import ModalCreate from "../components/ModalMedico/ModalCreate/ModalCreate";
import ModalUpdate from "../components/ModalMedico/ModalUpdate/ModalUpdate";


const Medicos = () => {

    useEffect(() => {
        if (!userAuth()) {
            navigate("/");
        }
    }, []);

    const [medicos, setMedicos] = useState([{}])
    const [pageInfo, setPageInfo] = useState({})
    const [showModalCreateAndUpdate, setShowModalCreateAndUpdate] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [formData, setFormData] = useState({});
    const [modalTitle, setModalTitle] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [newMedicoData, setNewMedicoData] = useState({});
    const [medicoData, setMedicoData] = useState({});

    useEffect(() => {
        const getMedicos = async () => {
            await axios.get(`http://localhost:8080/medicos?size=3&page=${pageNumber}&sort=name`, { headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZWRybyIsInJvbGVzIjpbIlJPTEVfQURNIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9sb2dpbiIsImV4cCI6MTY1MzE4NTA1OX0.u5CQ_yYEqZhU51F1VeVsYO2sXTdFqjZqeqxZ-kGTeHY' } })
                .then((response) => {
                    setMedicos(response.data.content)
                    setPageInfo(response.data)
                }
                );
        }
        getMedicos()
    }, [pageNumber])

    const saveMedico = async () => {
        const response = await axios
            .post("http://localhost:8080/medicos", newMedicoData)
            .then(response => {
                console.log(response)
                toast.success("Medico cadastrado com sucesso!")
            }).catch(error => {
                console.log(error)
                toast.success("Não foi possível cadastar o médico!")
            })
    }

    const updateMedico = async () => {
        const response = await axios
            .put("http://localhost:8080/medicos", newMedicoData)
            .then(response => {
                console.log(response)
                toast.success("Medico atualizado com sucesso!")
            }).catch(error => {
                console.log(error)
                toast.success("Não foi possível modificar o médico!")
            })
    }

    const updatePageNumber = (number) => {
        setPageNumber(number)
        getMedicos(number)
    }

    const callSaveMedico = () => {
        saveMedico()
    }

    const callUpdateMedico = () => {
        updateMedico()
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
            <ModalCreate
                show={showModalCreateAndUpdate}
                setShow={setShowModalCreateAndUpdate}
                element="Médico"
                saveMedico={callSaveMedico}>
                <FormMedico data={formData} setNewMedicoData={setNewMedicoData}
                    newMedicoData={newMedicoData} />
            </ModalCreate>

            <ModalUpdate
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                element="Paciente"
                updateMedico={callUpdateMedico}
            >
                <FormUpdatePaciente
                    medicoData={medicoData}
                    setMedicoData={setMedicoData}
                />
            </ModalUpdate>

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