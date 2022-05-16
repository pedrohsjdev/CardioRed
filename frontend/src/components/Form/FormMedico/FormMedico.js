import React from "react";

const FormMedico = (props) => {
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
                        defaultValue={props.data.doctorType}>
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
                        disabled={props.disabled}
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
                        disabled={props.disabled}
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
                        disabled={props.disabled}
                        defaultValue={props.data.titulation}
                    />
                </div>
            </div>
        </form>
    );
};

export default FormMedico;