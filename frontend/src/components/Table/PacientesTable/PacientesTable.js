import React, { useEffect, useState } from "react";
import "./PacientesTable.css";
import { findAllPacientes, findPacientesByCpf, findPacientesByName } from "../../../services/Paciente/PacienteService";

const PacientesTable = ({ searchInput, currentPage, refreshPacienteTable, setPageData, openModalView }) => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const getPacientes = async () => {
            const response = await findAllPacientes(currentPage);
            if (response.content) {
                setPacientes(response.content);
            } else {
                setPacientes([]);
            }
            setPageData(response);
        };

        const getPacientesByName = async () => {
            const response = await findPacientesByName(
                searchInput.charAt(0).toUpperCase() + searchInput.slice(1),
                currentPage
            );
            setPacientes(response.data.content);
            setPageData(response.data);
        };

        const getPacientesByCPF = async () => {
            const response = await findPacientesByCpf(searchInput, currentPage);
            setPacientes(response.data.content);
            setPageData(response.data);
        };

        if (searchInput == "") {
            getPacientes();
        } else if (isLetter(searchInput.charAt(0))) {
            getPacientesByName();
        } else {
            getPacientesByCPF();
        }
    }, [currentPage, searchInput, refreshPacienteTable]);

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };

    const isLetter = (char) => {
        if (typeof char !== "string") {
            return false;
        }

        return char.toLocaleLowerCase() !== char.toUpperCase();
    };

    return (
        <>
            <table className="table table-striped table-hover mt-3 paciente-table">
                <thead>
                    <tr>
                        <th scope="col" className="cpf">
                            CPF
                        </th>
                        <th scope="col" className="name">
                            Nome
                        </th>
                        <th scope="col" className="gender">
                            Sexo
                        </th>
                        <th scope="col" className="ethnicity">
                            Cor
                        </th>
                        <th scope="col" className="birth-date">
                            Data de Nascimento
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!pacientes.length || pacientes === undefined ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                Nenhum paciente encontrado.
                            </td>
                        </tr>
                    ) : (
                        pacientes.map((paciente, index) => (
                            <tr onClick={() => openModalView(paciente)} key={index}>
                                <td>{paciente.cpf ? maskCPF(paciente.cpf) : ""} </td>
                                <td>{paciente.name}</td>
                                <td>{paciente.gender === "F" ? "Feminino" : "Masculino"}</td>
                                <td>{paciente.ethnicity}</td>
                                <td>{paciente.birthDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">CPF</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Cor</th>
                        <th scope="col">Data de Nascimento</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default PacientesTable;
