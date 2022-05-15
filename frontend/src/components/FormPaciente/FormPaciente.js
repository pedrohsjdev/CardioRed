import React from "react";

const FormPaciente = () => {
    return (
        <form>
            <div className="row mb-3">
                <label
                    htmlFor="inputCPF"
                    className="col-sm-2 col-form-label col-form-label-lg"
                >
                    CPF*:
                </label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="inputCPF" />
                </div>
            </div>

            <div className="row mb-3">
                <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label col-form-label-lg"
                >
                    Nome*:
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="selectGender"
                    className="col-sm-2 col-form-label col-form-label-lg"
                >
                    Sexo*:
                </label>
                <div className="col-sm-10">
                    <select className="form-select" id="selectGender">
                        <option defaultValue>Escolha uma opção</option>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="inputBirthDate"
                    className="col-sm-4 col-form-label col-form-label-lg"
                >
                    Data de Nascimento*:
                </label>
                <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="inputBirthDate"
                    />
                </div>
            </div>
        </form>
    );
};

export default FormPaciente;
