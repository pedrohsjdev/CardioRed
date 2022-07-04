import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import moment from "moment";
import { findPacientesByName } from "../../../../services/Paciente/PacienteService";
import { findMedicosByName } from "../../../../services/Medico/MedicoService";
import { getLastLaudoId, consultaExists } from "../../../../services/Laudo/LaudoService";
import { findCIDByCode, findCIDByName } from "../../../../services/Consulta/ConsultaService";
import { userIsAdm } from "../../../../services/Login/LoginService";

const FormCreateLaudo = ({ newLaudoData, setNewLaudoData, saveLaudo, setShow }) => {
    const [newId, setNewId] = useState(1);
    useEffect(() => {
        const getNewId = async () => {
            await getLastLaudoId().then((res) => {
                setNewId(res.data + 1);
            });
        };

        getNewId();
    }, []);
    const laudoChange = (event) => {
        setNewLaudoData({
            ...newLaudoData,
            [event.target.name]: event.target.value,
        });
    };

    const isLetter = (char) => {
        if (typeof char !== "string") {
            return false;
        }

        return char.toLocaleLowerCase() !== char.toUpperCase();
    };

    const [conclusionIsLoading, setConclusionIsLoading] = useState(false);
    const [conclusionOptions, setConclusionOptions] = useState([]);
    const handleSearchConclusion = (query) => {
        setConclusionIsLoading(true);

        if (isLetter(query.charAt(1))) {
            findCIDByName(query).then((res) => {
                setConclusionOptions(res.data);
                setConclusionIsLoading(false);
            });
        } else {
            findCIDByCode(query).then((res) => {
                setConclusionOptions(res.data);
                setConclusionIsLoading(false);
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
    const [conclusionIsInvalid, setConclusionIsInvalid] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorPacienteMessage, setErrorPacienteMessage] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newLaudoData.paciente) {
            setPacienteIsInvalid(true);
            setErrorPacienteMessage("Informe o paciente.");
            return;
        }
        if (!newLaudoData.conclusion) {
            setConclusionIsInvalid(true);
            return;
        }
        if (examTypeIsInvalid) {
            return;
        }
        if (resultIsInvalid) {
            return;
        }

        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            console.log(newLaudoData);
            saveLaudo();
        }

        setValidated(true);
    };

    const [examTypeError, setExamTypeError] = useState("Informe o tipo de exame.");
    const [examTypeIsInvalid, setExamTypeIsInvalid] = useState(false);
    useEffect(
        () => {
            const timeoutExamType = setTimeout(() => {
                consultaExists({ paciente: newLaudoData.paciente, examType: newLaudoData.examType }).then((res) => {
                    if (!res.data) {
                        setExamTypeIsInvalid(true);
                        setExamTypeError(
                            "O paciente selecionado não possui nenhuma consulta, com esse tipo de exame, aguardando a emissão do laudo."
                        );
                    } else {
                        setExamTypeIsInvalid(false);
                    }
                });
            }, 500);
            return () => clearTimeout(timeoutExamType);
        },
        [newLaudoData.examType],
        [newLaudoData.paciente]
    );

    const [resultIsInvalid, setResultIsInvalid] = useState(false);
    const [resultsErrorMessage, setResultsErrorMessage] = useState("É necessário carregar o resultado do exame.");
    const handleConvertFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile.size > 200000) {
            setResultsErrorMessage("Não é possível carregar um PDF com mais de 200Kbytes.");
            setResultIsInvalid(true);
            return;
        }
        if (!selectedFile.type == "application/pdf") {
            setResultIsInvalid(true);
            return;
        }

        setResultIsInvalid(false);

        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
            const file = ev.target.result;
            setNewLaudoData({
                ...newLaudoData,
                results: file,
            });
        };

        window.open(URL.createObjectURL(selectedFile));
        fileReader.readAsDataURL(selectedFile);
    };

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
                            placeholder="Buscar médicos..."
                            onChange={(option) => {
                                setNewLaudoData({ ...newLaudoData, medico: option[0] });
                                if (!option.length) {
                                    setMedicoIsInvalid(true);
                                } else {
                                    setMedicoIsInvalid(false);
                                }
                                console.log(newLaudoData);
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
                    Identificador:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control value={newId} name="id" disabled onChange={laudoChange} type="number" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Resultados*:
                </Form.Label>
                <Col sm={10}>
                    <Col className="mb-3">
                        <Form.Control
                            isInvalid={resultIsInvalid}
                            required
                            accept=".pdf"
                            type="text"
                            placeholder="Carregue o PDF com o resultado da consulta."
                            onFocus={(e) => {
                                e.target.type = "file";
                            }}
                            onChange={handleConvertFile}
                        />

                        <Form.Control.Feedback tooltip type="invalid">
                            {resultsErrorMessage}
                        </Form.Control.Feedback>
                    </Col>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        max={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                        required
                        name="dateTime"
                        type="text"
                        placeholder="Informe a data e a hora que o exame foi realizado."
                        onFocus={(e) => {
                            e.target.type = "datetime-local";
                        }}
                        onChange={laudoChange}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a data e a hora que irá constar no laudo.
                    </Form.Control.Feedback>
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
                        placeholder="Buscar pacientes..."
                        onChange={(option) => {
                            setNewLaudoData({ ...newLaudoData, paciente: option[0] });
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
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select isInvalid={examTypeIsInvalid} onChange={laudoChange} required name="examType">
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
                <Form.Label column sm={2}>
                    Descrição*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        placeholder="Informe uma breve descrição dos resultados."
                        as="textarea"
                        onChange={laudoChange}
                        required
                        name="description"
                        type="textfield"
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a descrição.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Conclusão*:
                </Form.Label>
                <Col sm={10}>
                    <AsyncTypeahead
                        id="cidAsync"
                        isInvalid={conclusionIsInvalid}
                        required
                        name="conclusion"
                        isLoading={conclusionIsLoading}
                        labelKey={(option) => `${option.code} - (${option.name})`}
                        onSearch={handleSearchConclusion}
                        options={conclusionOptions}
                        minLength={3}
                        promptText="Buscar códigos..."
                        searchText="Buscando..."
                        emptyLabel="Nenhum código encontrado."
                        placeholder="A conclusão deve ser baseada no CID-10."
                        onChange={(option) => {
                            setNewLaudoData({ ...newLaudoData, conclusion: option[0] });
                            if (!option.length) {
                                setConclusionIsInvalid(true);
                            } else {
                                setConclusionIsInvalid(false);
                            }
                        }}
                        renderMenuItemChildren={(option) => (
                            <span>
                                {option.code} - ({option.name})
                            </span>
                        )}
                    />
                    <div hidden={!conclusionIsInvalid} className="invalid-tooltip" style={{ display: "block" }}>
                        Informe a hipótese diagnóstica.
                    </div>
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

export default FormCreateLaudo;
