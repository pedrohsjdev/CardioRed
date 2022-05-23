import React from "react";

const FormCreatePaciente = ({ newPacienteData, setNewPacienteData }) => {
    const pacienteChange = (event) => {
        setNewPacienteData({
            ...newPacienteData,
            [event.target.name]: event.target.value,
        });
    };

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
                    <input
                        type="text"
                        className="form-control"
                        id="inputCPF"
                        name="cpf"
                        onChange={pacienteChange}
                    />
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
                        name="name"
                        onChange={pacienteChange}
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
                    <select
                        className="form-select"
                        id="selectGender"
                        name="gender"
                        onChange={pacienteChange}
                    >
                        <option value="">Escolha uma opção</option>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="inputEthnicity"
                    className="col-sm-2 col-form-label col-form-label-lg"
                >
                    Cor*:
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-select"
                        id="inputEthnicity"
                        name="ethnicity"
                        onChange={pacienteChange}
                    ></input>
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
                        name="birthDate"
                        onChange={pacienteChange}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormCreatePaciente;
