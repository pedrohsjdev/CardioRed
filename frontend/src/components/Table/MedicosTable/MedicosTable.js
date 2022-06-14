import React, { useState, useEffect } from "react";
import "./MedicosTable.css";
import { findAllMedicos, findMedicosByCRM } from "../../../services/Medico/MedicoService";

const MedicosTable = ({ currentPage, searchInput, refreshMedicoTable, openModalView, setPageData }) => {
    const [medicos, setMedicos] = useState([{}]);

    useEffect(() => {
        const getMedicos = async () => {
            const response = await findAllMedicos(currentPage);
            if (response.content) {
                setMedicos(response.content);
            } else {
                setMedicos([{}]);
            }
            setPageData(response);
        };

        const getMedicosByCRM = async () => {
            const response = await findMedicosByCRM(searchInput);
            setMedicos(response);
            setPageData(response);
        };

        if (searchInput == "") {
            getMedicos();
        } else {
            getMedicosByCRM();
        }
    }, [currentPage, searchInput, refreshMedicoTable]);

    return (
        <>
            <table className="table table-striped table-hover mt-3 medico-table">
                <thead>
                    <tr>
                        <th className="crm" scope="col">
                            CRM
                        </th>
                        <th className="name" scope="col">
                            Nome
                        </th>
                        <th className="doctor-type" scope="col">
                            Hierarquia
                        </th>
                        <th className="residencyYear" scope="col">
                            Ano Residência
                        </th>
                        <th className="titulation" scope="col">
                            Titulação
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.map((medico, index) => (
                        <tr onClick={() => openModalView(medico)} key={index}>
                            <td>{medico.crm}</td>
                            <td>{medico.name}</td>
                            <td>{medico.doctorType}</td>
                            <td>{medico.residencyYear}</td>
                            <td>{medico.titulation}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">CRM</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Hierarquia</th>
                        <th scope="col">Ano Residência</th>
                        <th scope="col">Titulação</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default MedicosTable;
