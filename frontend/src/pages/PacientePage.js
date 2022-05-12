import React from "react";

import FormSearch from "../components/SearchBar/FormSearch";
import Pagination from "../components/Paginator/Pagination";
import CounterElements from "../components/TableCounter/CounterElements";

const PacientePage = () => {
  // Temporary test data
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

  // Temporary test variables
  let pagesNumber = [1, 2, 3, 4, 5];
  let totalPacientes = 57;
  let firstPaciente = 1;
  let lastPaciente = 10;

  //Temporary style variables
  const buttonStyle = {
    fontSize: "1rem",
    borderRadius: "8px",
    padding: "0.2rem 4rem",
  };

  const h1Style = {
    margin: "3rem 0 3rem 0",
  };

  const divTableStyle = {
    margin: "3rem 0 0 0",
  };

  const tableStyle = {
    textAlign: "center",
  };

  return (
    <>
      <div className="container">
        <h1 style={h1Style}>Listagem de Pacientes</h1>
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

        <div style={divTableStyle}>
          <table style={tableStyle} className="table table-striped table-hover">
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
