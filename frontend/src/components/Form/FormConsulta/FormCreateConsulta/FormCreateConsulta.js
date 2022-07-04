import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import moment from "moment";
import { findPacientesByName } from "../../../../services/Paciente/PacienteService";
import { findMedicosByName } from "../../../../services/Medico/MedicoService";
import {
    getLastCosultaId,
    consultaAlreadyExistsSaving,
    findCIDByCode,
    findCIDByName,
} from "../../../../services/Consulta/ConsultaService";
import { userIsAdm } from "../../../../services/Login/LoginService";
import "./FormCreateConsulta.css";

const FormCreateConsulta = ({ newConsultaData, setNewConsultaData, saveConsulta, setShow }) => {
    const [newId, setNewId] = useState(1);
    useEffect(() => {
        const getNewId = async () => {
            await getLastCosultaId().then((res) => {
                setNewId(res.data + 1);
            });
        };

        getNewId();
    }, []);
    const consultaChange = (event) => {
        setNewConsultaData({
            ...newConsultaData,
            [event.target.name]: event.target.value,
        });
        console.log(newConsultaData);
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
    const [options, setOptions] = useState([]);
    const handleSearch = (name) => {
        setIsLoading(true);

        findPacientesByName(name.charAt(0).toUpperCase() + name.slice(1)).then((response) => {
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
        if (!newConsultaData.medico) {
        }
        if (!newConsultaData.paciente) {
            setPacienteIsInvalid(true);
            setErrorPacienteMessage("Informe o paciente.");
            return;
        }
        if (!newConsultaData.diagnosticAssumption) {
            setDiagnosticAssumptionIsInvalid(true);
            return;
        }
        if (examTypeIsInvalid) {
            return;
        }

        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            saveConsulta();
        }

        setValidated(true);
    };

    const [examTypeError, setExamTypeError] = useState("Informe o tipo de exame.");
    const [examTypeIsInvalid, setExamTypeIsInvalid] = useState(false);
    useEffect(() => {
        const timeoutExamType = setTimeout(() => {
            consultaAlreadyExistsSaving(newConsultaData).then((res) => {
                if (res.data) {
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
    }, [newConsultaData.examType]);

    /* Medico ASYNC */
    const [isLoadingMedico, setIsLoadingMedico] = useState(false);
    const [optionsMedico, setOptionsMedico] = useState([]);
    const [medicoIsInvalid, setMedicoIsInvalid] = useState(false);
    const handleSearchMedico = (name) => {
        setIsLoadingMedico(true);

        findMedicosByName(name.charAt(0).toUpperCase() + name.slice(1)).then((response) => {
            setOptionsMedico(response.data);
            setIsLoadingMedico(false);
        });
    };

    const renderMedicoInput = () => {
        if (userIsAdm()) {
            return (
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Médico*:
                    </Form.Label>
                    <Col sm={10}>
                        <AsyncTypeahead
                            id="medicoAsync"
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
                                setNewConsultaData({ ...newConsultaData, medico: option[0] });
                                if (!option.length) {
                                    setMedicoIsInvalid(true);
                                } else {
                                    setMedicoIsInvalid(false);
                                }
                                console.log(newConsultaData);
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
                <Form.Label column sm={2}>
                    Identificador*:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control value={newId} disabled name="id" type="number" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Paciente*:
                </Form.Label>
                <Col sm={10}>
                    <AsyncTypeahead
                        id="pacienteAsync"
                        isInvalid={pacienteIsInvalid}
                        required
                        isLoading={isLoading}
                        labelKey={(option) => `${option.name} - (${option.cpf})`}
                        onSearch={handleSearch}
                        options={options}
                        minLength={1}
                        promptText="Buscar pacientes..."
                        searchText="Buscando..."
                        emptyLabel="Nenhum paciente encontrado."
                        onChange={(option) => {
                            setNewConsultaData({ ...newConsultaData, paciente: option[0] });
                            if (!option.length) {
                                setPacienteIsInvalid(true);
                            } else {
                                setPacienteIsInvalid(false);
                            }
                        }}
                        renderMenuItemChildren={(option) => (
                            <span>
                                {option.name} - ({option.cpf})
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
                        required
                        name="dateTime"
                        type="text"
                        placeholder="Informe a data e a hora que a consulta será realizada."
                        onFocus={(e) => {
                            e.target.type = "datetime-local";
                        }}
                        onChange={consultaChange}
                    />

                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a data e a hora da consulta.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select isInvalid={examTypeIsInvalid} onChange={consultaChange} required name="examType">
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
                <Form.Label column sm={4}>
                    Hipótese diagnóstica*:
                </Form.Label>
                <Col sm={8}>
                    <AsyncTypeahead
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
                            console.log;
                            setNewConsultaData({ ...newConsultaData, diagnosticAssumption: option[0] });
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

export default FormCreateConsulta;
