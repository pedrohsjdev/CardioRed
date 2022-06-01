import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/requests";
import "./table.css";

const MedicosTable = (props) => {
    const [medicos, setMedicos] = useState([{}]);

    useEffect(() => {
        const findMedicosByCRM = async () => {
            const { data } = await axios.get(
                `${BASE_URL}/medicos/find/crm/${props.searchInput}`
            );
            setMedicos([data]);
        };

        const fetchMedicos = async () => {
            const { data } = await axios.get(
                `${BASE_URL}/medicos?page=${props.currentPage}&size=10&sort=name`
            );
            setMedicos(data.content);
            props.setPageData(data);
        };

        if (props.searchInput == "") {
            fetchMedicos();
        } else {
            findMedicosByCRM();
        }
    }, [props.currentPage, props.searchInput, props.refreshMedicoTable]);

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
                        <tr
                            onClick={() => props.openModalView(medico)}
                            key={index}
                        >
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
