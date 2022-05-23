import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";

const PacientesTable = (props) => {
    const [pacientes, setPacientes] = useState([{}]);

    useEffect(() => {
        const findPacienteByCPF = async () => {
            const { data } = await axios.get(
                `http://localhost:8080/pacientes/cpf/${props.searchInput}`
            );
            setPacientes([formatCPF(data)]);
        };

        const fetchPacientes = async () => {
            const { data } = await axios.get(
                `http://localhost:8080/pacientes?page=${props.currentPage}&size=10`
            );
            setPacientes(data.content.map(formatCPF));
            props.setPageData(data);
        };

        if (props.searchInput && props.searchInput.length == 11) {
            findPacienteByCPF();
        } else {
            fetchPacientes();
        }
    }, [props.currentPage, props.searchInput, props.refreshPacienteTable]);

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
                    {pacientes.map((paciente) => (
                        <tr
                            onClick={() => props.openModalView(paciente)}
                            key={paciente.id}
                        >
                            <td>{paciente.cpf} </td>
                            <td>{paciente.name}</td>
                            <td>
                                {paciente.gender === "F"
                                    ? "Feminino"
                                    : "Masculino"}
                            </td>
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
