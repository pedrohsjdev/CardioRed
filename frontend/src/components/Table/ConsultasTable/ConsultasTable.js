import React, { useEffect, useState } from "react";
import "./ConsultasTable.css";
import {
    findAllConsultas,
    findConsultasByPacienteCpf,
    findConsultasByPacienteName,
} from "../../../services/Consulta/ConsultaService";

const ConsultasTable = ({ searchInput, currentPage, refreshConsultaTable, setPageData, openModalView }) => {
    const [consultas, setConsultas] = useState([{}]);

    const isLetter = (char) => {
        if (typeof char !== "string") {
            return false;
        }

        return char.toLocaleLowerCase() !== char.toUpperCase();
    };

    useEffect(() => {
        const getConsultas = async () => {
            const response = await findAllConsultas(currentPage);
            if (response.content) {
                setConsultas(response.content);
            } else {
                setConsultas([{}]);
            }
            setPageData(response);
        };

        const getConsultasByPacienteName = async () => {
            const response = await findConsultasByPacienteName(
                searchInput.charAt(0).toUpperCase() + searchInput.slice(1)
            );
            setConsultas(response.data.content);
            setPageData(response.data);
        };

        const getConsultasByPacienteCpf = async () => {
            const response = await findConsultasByPacienteCpf(searchInput);
            setConsultas(response.data.content);
            setPageData(response.data);
        };

        if (searchInput == "") {
            getConsultas();
        } else if (isLetter(searchInput.charAt(0))) {
            getConsultasByPacienteName();
        } else {
            getConsultasByPacienteCpf();
        }
    }, [currentPage, searchInput, refreshConsultaTable]);

    return (
        <>
            <table className="table table-striped table-hover mt-3 paciente-table">
                <thead>
                    <tr>
                        <th scope="col" className="id center">
                            Identificador
                        </th>
                        <th scope="col" className="paciente">
                            Paciente
                        </th>
                        <th scope="col" className="exam">
                            Exame
                        </th>
                        <th scope="col" className="date">
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!consultas.length || consultas === undefined ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                Nenhuma consulta encontrada.
                            </td>
                        </tr>
                    ) : (
                        consultas.map((consulta, index) => (
                            <tr onClick={() => openModalView(consulta)} key={index}>
                                <td className="center">{consulta.id} </td>
                                <td className="paciente">
                                    {consulta.paciente ? consulta.paciente.name : consulta.paciente}
                                </td>
                                <td>{consulta.examType}</td>
                                <td>{consulta.dateTime}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col" className="center">
                            Identificador
                        </th>
                        <th scope="col" className="paciente">
                            Paciente
                        </th>
                        <th scope="col">Exame</th>
                        <th scope="col">Data</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ConsultasTable;
