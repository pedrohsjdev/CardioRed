import React, { useEffect, useState } from "react";
import "./LaudosTable.css";
import {
    findAllLaudos,
    findLaudosByPacienteName,
    findLaudosByPacienteCpf,
    findLaudosByStatusNot,
} from "../../../services/Laudo/LaudoService";
import { userIsMedico } from "../../../services/Login/LoginService";

const LaudosTable = ({ searchInput, currentPage, refreshLaudoTable, setPageData, openModalView }) => {
    const [laudos, setLaudos] = useState([{}]);

    const isLetter = (char) => {
        if (typeof char !== "string") {
            return false;
        }

        return char.toLocaleLowerCase() !== char.toUpperCase();
    };

    useEffect(() => {
        const getLaudos = async () => {
            const response = userIsMedico()
                ? await findLaudosByStatusNot("PROVISORIO", currentPage)
                : await findAllLaudos(currentPage);
            if (response.content) {
                console.log(response);
                setLaudos(response.content);
            } else {
                setLaudos([{}]);
            }
            setPageData(response);
        };

        const getLaudosByPacienteName = async () => {
            const response = await findLaudosByPacienteName(searchInput.charAt(0).toUpperCase() + searchInput.slice(1));
            setLaudos(response.data.content);
            setPageData(response.data);
        };

        const getLaudosByPacienteCpf = async () => {
            const response = await findLaudosByPacienteCpf(searchInput);
            setLaudos(response.data.content);
            setPageData(response.data);
        };

        if (searchInput == "") {
            getLaudos();
        } else if (isLetter(searchInput.charAt(0))) {
            getLaudosByPacienteName();
        } else {
            getLaudosByPacienteCpf();
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
                    {!laudos.length || laudos === undefined ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                Nenhum laudo encontrado.
                            </td>
                        </tr>
                    ) : (
                        laudos.map((laudo, index) => (
                            <tr
                                className={laudo.status === "Provisório" ? "special" : ""}
                                onClick={() => openModalView(laudo)}
                                key={index}
                            >
                                <td className="center">{laudo.id} </td>
                                <td className="paciente">{laudo.paciente ? laudo.paciente.name : ""}</td>
                                <td>{laudo.examType}</td>
                                <td>{laudo.dateTime}</td>
                                <td>{laudo.medico ? laudo.medico.name : ""}</td>
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
                        <th scope="col">Data do Exame</th>
                        <th scope="col">Responsável pelo Laudo</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default LaudosTable;
