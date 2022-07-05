import React, { useEffect, useState } from "react";
import "./LaudosTable.css";
import {
    findAllLaudos,
    findLaudosByPacienteName,
    findLaudosByPacienteCpfToMedico,
    findLaudosByPacienteCpfToResidente,
    findLaudosByPacienteNameToMedico,
    findLaudosByPacienteNameToResidente,
    findLaudosByPacienteCpf,
    findLaudosByStatusNot,
    findAllLaudosResidenteUser,
} from "../../../services/Laudo/LaudoService";
import { userIsMedico, userIsResidente, getUsername } from "../../../services/Login/LoginService";

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
            let response;
            if (userIsMedico()) {
                response = await findLaudosByStatusNot("PROVISORIO", currentPage);
            } else if (userIsResidente()) {
                response = await findAllLaudosResidenteUser(getUsername(), currentPage);
            } else {
                response = await findAllLaudos(currentPage);
            }

            if (response.data.content) {
                setLaudos(response.data.content);
            } else {
                setLaudos([{}]);
            }
            setPageData(response.data);
        };

        const getLaudosByPacienteName = async () => {
            let response;
            if (userIsMedico()) {
                response = await findLaudosByPacienteNameToMedico(
                    searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                    currentPage
                );
            } else if (userIsResidente()) {
                response = await findLaudosByPacienteNameToResidente(
                    searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                    getUsername(),
                    currentPage
                );
            } else {
                response = await findLaudosByPacienteName(
                    searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                    currentPage
                );
            }
            setLaudos(response.data.content);
            setPageData(response.data);
        };

        const getLaudosByPacienteCpf = async () => {
            let response;
            if (userIsMedico()) {
                response = await findLaudosByPacienteCpfToMedico(
                    searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                    currentPage
                );
            } else if (userIsResidente()) {
                response = await findLaudosByPacienteCpfToResidente(
                    searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                    getUsername(),
                    currentPage
                );
            } else {
                response = await findLaudosByPacienteCpf(
                    searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                    currentPage
                );
            }

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
