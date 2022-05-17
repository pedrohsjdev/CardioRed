import React from "react";

const MedicosTable = (props) => {
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
}

export default MedicosTable;