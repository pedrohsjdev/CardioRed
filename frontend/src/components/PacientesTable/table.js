import React from "react";

const PacientesTable = (props) => {
    //Temporary test data
    const pacientes = [
        {
            id: 1,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 2,
            cpf: "521.560.533-59",
            nome: "EmilyCastro",
            sexo: "M",
            cor: "Branco",
            dataNascimento: "09/01/199",
        },
        {
            id: 3,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 4,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 5,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 6,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 7,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 8,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 9,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
        {
            id: 10,
            cpf: "521.560.533-59",
            nome: "Emily Aline Alícia Castro",
            sexo: "F",
            cor: "Branco",
            dataNascimento: "09/01/1999",
        },
    ];

    return (
        <>
            <table className="table table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">CPF</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sexo</th>
                        <th scope="col">Cor</th>
                        <th scope="col">Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map((paciente) => (
                        <tr
                            onClick={() => props.openModalView(paciente)}
                            key={paciente.id}
                        >
                            <td>{paciente.cpf}</td>
                            <td>{paciente.nome}</td>
                            <td>
                                {paciente.sexo === "F"
                                    ? "Feminino"
                                    : "Masculino"}
                            </td>
                            <td>{paciente.cor}</td>
                            <td>{paciente.dataNascimento}</td>
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
