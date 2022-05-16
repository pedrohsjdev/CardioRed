import React from "react";

const FormPaciente = (props) => {
    return (
        <form>
            <input hidden defaultValue={props.id} />
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
                        disabled={props.disabled}
                        defaultValue={props.data.cpf}
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
                        disabled={props.disabled}
                        defaultValue={props.data.nome}
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
                        disabled={props.disabled}
                        defaultValue={props.data.sexo}
                    >
                        <option value="">Escolha uma opção</option>
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
                        disabled={props.disabled}
                        defaultValue={props.data.dataNascimento}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormPaciente;
