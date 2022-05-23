import React from "react";

const FormUpdatePaciente = ({ pacienteData, setPacienteData }) => {
    const pacienteChange = (event) => {
        setPacienteData({
            ...pacienteData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form>
            <input hidden defaultValue={pacienteData.id} name="id" />
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
                        defaultValue={pacienteData.cpf}
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
                        defaultValue={pacienteData.name}
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
                        defaultValue={pacienteData.gender}
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
                        defaultValue={pacienteData.ethnicity}
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
                        defaultValue={pacienteData.birthDate}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormUpdatePaciente;
