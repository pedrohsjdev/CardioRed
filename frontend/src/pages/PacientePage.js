import React from "react";

import FormSearch from "../components/FormSearch";
import Pagination from "../components/Pagination";
import CounterElements from "../components/CounterElements";

const PacientePage = () => {
  const pacientes = [
    {
      id: 1,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 2,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 3,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 4,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 5,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 6,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 7,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 8,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 9,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
    {
      id: 10,
      cpf: "521.560.533-59",
      nome: "Emily Aline Alícia Castro",
      sexo: "Feminino",
      cor: "Branco",
      dataNascimento: "09/01/1999",
    },
  ];

  let pagesNumber = [1, 2, 3, 4, 5];
  let totalPacientes = 57;
  let firstPaciente = 1;
  let lastPaciente = 10;
  const buttonStyle = {
    fontSize: "1rem",
    borderRadius: "8px",
    padding: "0.2rem 4rem",
  };

  return (
    <>
      <div className="container">
        <h1 style={{ margin: "3rem 0 3rem 0" }}>Listagem de Pacientes</h1>
        <div className="d-flex justify-content-between">
          <button
            style={buttonStyle}
            type="button"
            className="btn btn-primary btn-sm"
          >
            Cadastrar
          </button>
          <FormSearch criteria="CPF" />
        </div>

        <div style={{ margin: "3rem 0 0 0" }}>
          <table
            style={{ textAlign: "center" }}
            className="table table-striped table-hover"
          >
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
                <tr key={paciente.id}>
                  <td>{paciente.cpf}</td>
                  <td>{paciente.nome}</td>
                  <td>{paciente.sexo}</td>
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

          <div className="d-flex justify-content-between">
            <CounterElements
              firstElement={firstPaciente}
              lastElement={lastPaciente}
              totalElements={totalPacientes}
            />

            <Pagination pagesNumber={pagesNumber} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PacientePage;
