import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getPacientesByName } from "../../../../services/Paciente/PacienteService";
import { getMedicosByName } from "../../../../services/Medico/MedicoService";
import moment from "moment";
import {
    findCIDByCode,
    findCIDByName,
    consultaAlreadyExistsChanging,
} from "../../../../services/Consulta/ConsultaService";
import { userIsAdm } from "../../../../services/Login/LoginService";

const FormUpdateConsulta = ({ consultaData, setConsultaData, updateConsulta, setShow }) => {
    const consultaChange = (event) => {
        if (event.target.name === "dateTime") {
            setConsultaData({
                ...consultaData,
                dateTime: moment(event.target.value).format("DD/MM/yyyy - HH:mm"),
            });
        } else {
            setConsultaData({
                ...consultaData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const isLetter = (char) => {
        if (typeof char !== "string") {
            return false;
        }

        return char.toLocaleLowerCase() !== char.toUpperCase();
    };

    const [diagnosticAssumptionIsLoading, setDiagnosticAssumptionIsLoading] = useState(false);
    const [diagnosticAssumptionOptions, setDiagnosticAssumptionOptions] = useState([]);
    const handleSearchDiagnosticAssumption = (query) => {
        setDiagnosticAssumptionIsLoading(true);

        if (isLetter(query.charAt(1))) {
            findCIDByName(query).then((res) => {
                setDiagnosticAssumptionOptions(res.data);
                setDiagnosticAssumptionIsLoading(false);
            });
        } else {
            findCIDByCode(query).then((res) => {
                setDiagnosticAssumptionOptions(res.data);
                setDiagnosticAssumptionIsLoading(false);
            });
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([consultaData.paciente]);
    const handleSearch = (name) => {
        setIsLoading(true);

        getPacientesByName(name).then((response) => {
            setOptions(response.data);
            setIsLoading(false);
        });
    };

    const [pacienteIsInvalid, setPacienteIsInvalid] = useState(false);
    const [diagnosticAssumptionIsInvalid, setDiagnosticAssumptionIsInvalid] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorPacienteMessage, setErrorPacienteMessage] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!consultaData.paciente) {
            setPacienteIsInvalid(true);
            setErrorPacienteMessage("Informe o paciente.");
            return;
        }
        if (!consultaData.diagnosticAssumption) {
            setDiagnosticAssumptionIsInvalid(true);
            return;
        }
        if (examTypeIsInvalid) {
            return;
        }

        setPacienteIsInvalid(false);

        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            updateConsulta();
        }

        setValidated(true);
    };

    const [examTypeError, setExamTypeError] = useState("Informe o tipo de exame.");
    const [examTypeIsInvalid, setExamTypeIsInvalid] = useState(false);

    useEffect(() => {
        console.log(consultaData);
        const timeoutExamType = setTimeout(() => {
            consultaAlreadyExistsChanging(consultaData).then((res) => {
                if (res.data) {
                    console.log(res);
                    setExamTypeIsInvalid(true);
                    setPacienteIsInvalid(true);
                    setExamTypeError("Já existe uma consulta cadastrada com esse tipo de exame para o mesmo paciente.");
                    setErrorPacienteMessage("Consulta já cadastrada.");
                } else {
                    setExamTypeIsInvalid(false);
                    setPacienteIsInvalid(false);
                }
            });
        }, 500);
        return () => clearTimeout(timeoutExamType);
    }, [consultaData.examType]);

    /* Medico ASYNC */
    const [isLoadingMedico, setIsLoadingMedico] = useState(false);
    const [optionsMedico, setOptionsMedico] = useState([]);
    const [medicoIsInvalid, setMedicoIsInvalid] = useState(false);
    const handleSearchMedico = (name) => {
        setIsLoadingMedico(true);

        getMedicosByName(name.charAt(0).toUpperCase() + name.slice(1)).then((response) => {
            setOptionsMedico(response.data);
            setIsLoadingMedico(false);
        });
    };

    const renderMedicoInput = () => {
        if (userIsAdm()) {
            return (
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Médicos*:
                    </Form.Label>
                    <Col sm={9}>
                        <AsyncTypeahead
                            defaultInputValue={consultaData.medico.name + " - " + consultaData.medico.crm}
                            id="pacienteAsync"
                            isInvalid={medicoIsInvalid}
                            required
                            isLoading={isLoadingMedico}
                            labelKey={(option) => `${option.name} - (${option.crm})`}
                            onSearch={handleSearchMedico}
                            options={optionsMedico}
                            minLength={1}
                            promptText="Buscar médicos..."
                            searchText="Buscando..."
                            emptyLabel="Nenhum médico encontrado."
                            onChange={(option) => {
                                setConsultaData({ ...consultaData, medico: option[0] });
                                if (!option.length) {
                                    setMedicoIsInvalid(true);
                                } else {
                                    setMedicoIsInvalid(false);
                                }
                                console.log(consultaData);
                            }}
                            renderMenuItemChildren={(option) => (
                                <span>
                                    {option.name} - ({option.crm})
                                </span>
                            )}
                        />
                        <div hidden={!medicoIsInvalid} className="invalid-tooltip" style={{ display: "block" }}>
                            Informe o médico que irá realizar a consulta.
                        </div>
                    </Col>
                </Form.Group>
            );
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Identificador*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        defaultValue={consultaData.id}
                        disabled
                        name="id"
                        onChange={consultaChange}
                        type="number"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Paciente*:
                </Form.Label>
                <Col sm={9}>
                    <AsyncTypeahead
                        defaultInputValue={consultaData.paciente.name + " - " + consultaData.paciente.cpf}
                        id="pacienteAsync"
                        isInvalid={pacienteIsInvalid}
                        required
                        isLoading={isLoading}
                        labelKey="name"
                        onSearch={handleSearch}
                        options={options}
                        minLength={1}
                        promptText="Buscar pacientes..."
                        searchText="Buscando..."
                        emptyLabel="Nenhum paciente encontrado."
                        onChange={(option) => {
                            setConsultaData({ ...consultaData, paciente: option[0] });
                            if (!option.length) {
                                setPacienteIsInvalid(true);
                            } else {
                                setPacienteIsInvalid(false);
                            }
                        }}
                        renderMenuItemChildren={(option) => (
                            <span>
                                {option.name} ({option.cpf})
                            </span>
                        )}
                    />
                    <div hidden={!pacienteIsInvalid} className="invalid-tooltip" style={{ display: "block" }}>
                        {errorPacienteMessage}
                    </div>
                </Col>
            </Form.Group>
            {renderMedicoInput()}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        min={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                        defaultValue={moment(consultaData.dateTime, "DD/MM/YYYY - hh:mm").format("YYYY-MM-DDThh:mm:ss")}
                        required
                        name="dateTime"
                        type="datetime-local"
                        onChange={consultaChange}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a data e a hora da consulta.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Exame*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Select
                        isInvalid={examTypeIsInvalid}
                        defaultValue={consultaData.examType}
                        onChange={consultaChange}
                        required
                        name="examType"
                    >
                        <option value="">Escolha uma opção</option>
                        <option value="Ecocardiograma">Ecocardiograma</option>
                        <option value="Eletrocardiograma">Eletrocardiograma</option>
                        <option value="Mapa">Mapa</option>
                        <option value="Holter">Holter</option>
                    </Form.Select>
                    <Form.Control.Feedback tooltip type="invalid">
                        {examTypeError}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Hipótese diagnóstica*:
                </Form.Label>
                <Col sm={9}>
                    <AsyncTypeahead
                        className="input-heigth-large"
                        defaultInputValue={
                            consultaData.diagnosticAssumption.code + " - " + consultaData.diagnosticAssumption.name
                        }
                        id="cidAsync"
                        isInvalid={diagnosticAssumptionIsInvalid}
                        required
                        name="diagnosticAssumption"
                        isLoading={diagnosticAssumptionIsLoading}
                        labelKey={(option) => `${option.code} - (${option.name})`}
                        onSearch={handleSearchDiagnosticAssumption}
                        options={diagnosticAssumptionOptions}
                        minLength={3}
                        promptText="Buscar códigos..."
                        searchText="Buscando..."
                        emptyLabel="Nenhum código encontrado."
                        onChange={(option) => {
                            setConsultaData({ ...consultaData, diagnosticAssumption: option[0] });
                            if (!option.length) {
                                setDiagnosticAssumptionIsInvalid(true);
                            } else {
                                setDiagnosticAssumptionIsInvalid(false);
                            }
                        }}
                        renderMenuItemChildren={(option) => (
                            <span>
                                {option.code} - ({option.name})
                            </span>
                        )}
                    />

                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a hipótese diagnóstica.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-primary btn-modal btn-left" onClick={() => setShow(false)}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-modal">
                    Concluir
                </button>
            </div>
        </Form>
    );
};

export default FormUpdateConsulta;
