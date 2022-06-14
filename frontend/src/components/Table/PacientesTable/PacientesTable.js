import React, { useEffect, useState } from "react";
import "./PacientesTable.css";
import { findAllPacientes, findPacienteByCPF } from "../../../services/Paciente/PacienteService";

const PacientesTable = ({ searchInput, currentPage, refreshPacienteTable, setPageData, openModalView }) => {
    const [pacientes, setPacientes] = useState([{}]);

    useEffect(() => {
        const getPacientes = async () => {
            const response = await findAllPacientes(currentPage);
            if (response.content) {
                setPacientes(response.content.map(formatCPF));
            } else {
                setPacientes([{}]);
            }
            setPageData(response);
        };

        const getPacientesByCPF = async () => {
            const response = await findPacienteByCPF(searchInput);
            setPacientes(response.map(formatCPF));
            setPageData(response);
        };

        if (searchInput == "") {
            getPacientes();
        } else {
            getPacientesByCPF();
        }
    }, [currentPage, searchInput, refreshPacienteTable]);

    const formatCPF = (item) => {
        return {
            ...item,
            ["cpf"]: "".concat(
                item.cpf.slice(0, 3),
                ".",
                item.cpf.slice(3, 6),
                ".",
                item.cpf.slice(6, 9),
                "-",
                item.cpf.slice(9, 11)
            ),
        };
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
                    {pacientes.map((paciente, index) => (
                        <tr onClick={() => openModalView(paciente)} key={index}>
                            <td>{paciente.cpf} </td>
                            <td>{paciente.name}</td>
                            <td>{paciente.gender === "F" ? "Feminino" : "Masculino"}</td>
                            <td>{paciente.ethnicity}</td>
                            <td>{paciente.birthDate}</td>
                        </tr>
                    ))}
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
