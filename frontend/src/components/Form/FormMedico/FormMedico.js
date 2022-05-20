import React, { useState } from "react";

const FormMedico = (props) => {

    const [isResidenteDisabled, setIsResidenteDisabled] = useState(false);

    const [isDocenteDisabled, setIsDocenteDisabled] = useState(false);

    const validateDoctorType = (x) => {
        if (x.value == 'MEDICO') {
            setIsResidenteDisabled(true)
            setIsDocenteDisabled(true)
        } else if (x.value == 'DOCENTE'){
            setIsDocenteDisabled(false)
            setIsResidenteDisabled(true)
        }else{
            setIsDocenteDisabled(true)
            setIsResidenteDisabled(false)
        }
    }

    const saveMedico = async () => {
        const response = await axios
            .post(
                "http://localhost:8080/medicos",
                qs.stringify({
                    crm: inputs.crm,
                    name: inputs.name,
                    doctorType: inputs.doctorType
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            )
            .then(response => {
                console.log(response)
            })
    };

    const [inputs, setInputs] = useState({
        crm: "",
        name: "",
        doctorType: "",
        residencyYear: 0,
        titulation: "",
        password: ""
    });

    return (
        <form>
            <input hidden defaultValue={props.id} />
            <div className="row mb-3">
                <label
                    htmlFor="inputCRM"
                    className="col-sm-2 col-form-label col-form-label-lg">
                    CRM*:
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="inputCRM"
                        disabled={props.disabled}
                        defaultValue={props.data.crm}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label col-form-label-lg">
                    Nome*:
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        name="name"
                        disabled={props.disabled}
                        defaultValue={props.data.nome}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="selectDoctorType"
                    className="col-sm-2 col-form-label col-form-label-lg">
                    Hierarquia*:
                </label>
                <div className="col-sm-10">
                    <select
                        className="form-select"
                        id="selectDoctorType"
                        disabled={props.disabled}
                        defaultValue={props.data.doctorType}
                        name="doctorType"
                        onChange={(x) => validateDoctorType(x.target)}>
                        <option value="">Escolha uma opção</option>
                        <option value="MEDICO">Médico</option>
                        <option value="RESIDENTE">Residente</option>
                        <option value="DOCENTE">Docente</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="inputResidencyYear"
                    className="col-sm-4 col-form-label col-form-label-lg">
                    Ano de Residência*:
                </label>
                <div className="col-sm-8">
                    <input
                        type="date"
                        className="form-control"
                        id="inputResidencyYear"
                        name="residencyYear"
                        disabled={isResidenteDisabled}
                        defaultValue={props.data.resindecyYear}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="inputTitulation"
                    className="col-sm-4 col-form-label col-form-label-lg">
                    Titulação*:
                </label>
                <div className="col-sm-8">
                    <select
                        className="form-control"
                        id="inputTitulation"
                        name="titulation"
                        disabled={isDocenteDisabled}
                        defaultValue={props.data.titulation}>
                        <option value="">Escolha uma opção</option>
                        <option value="Doutor">Docente</option>
                        <option value="Assistente">Assistente</option>
                        <option value="Livre-docente">Livre-Docente</option>
                        <option value="Titular">Titular</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label
                    htmlFor="inputPassword"
                    className="col-sm-4 col-form-label col-form-label-lg">
                    Senha*:
                </label>
                <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        name="password"
                        disabled={props.disabled}
                        defaultValue={props.data.titulation}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormMedico;