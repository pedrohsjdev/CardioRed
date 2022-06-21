import React, { useEffect, useState } from "react";
import "./LaudosTable.css";
import { findAllLaudos, findLaudosByPacienteCpf } from "../../../services/Laudo/LaudoService";

const LaudosTable = ({ searchInput, currentPage, refreshLaudoTable, setPageData, openModalView }) => {
    const [laudos, setLaudos] = useState([{}]);

    useEffect(() => {
        const getLaudos = async () => {
            const response = await findAllLaudos(currentPage);
            if (response.content) {
                console.log(response);
                setLaudos(response.content);
            } else {
                console.log("teste");
                setLaudos([{}]);
            }
            setPageData(response);
        };

        const getLaudosByPacienteCpf = async () => {
            const response = await findLaudosByPacienteCpf(searchInput);
            setLaudos(response);
            setPageData(response);
        };

        if (searchInput == "") {
            getLaudos();
        } else {
            getLaudosBylaudoCpf();
        }
    }, [currentPage, searchInput, refreshLaudoTable]);

    return (
        <>
            <table className="table table-striped table-hover mt-3 laudo-table">
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
                            Data do Exame
                        </th>
                        <th scope="col" className="medico">
                            Responsável pelo Laudo
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {laudos.map((laudo, index) => (
                        <tr onClick={() => openModalView(laudo)} key={index}>
                            <td className="center">{laudo.id} </td>
                            <td className="paciente">{laudo.paciente?laudo.paciente.name:laudo.paciente}</td>
                            <td>{laudo.examType}</td>
                            <td>{laudo.dateTime}</td>
                            <td>{laudo.medico}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col" className="center">Identificador</th>
                        <th scope="col" className="paciente">Paciente</th>
                        <th scope="col">Exame</th>
                        <th scope="col">Data</th>
                        <th scope="col">Responsável pelo Laudo</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default LaudosTable;
