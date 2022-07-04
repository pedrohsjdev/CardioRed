import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import moment from "moment";
import { findPacientesByName } from "../../../../services/Paciente/PacienteService";
import { getLastLaudoId, consultaExists } from "../../../../services/Laudo/LaudoService";
import { findCIDByCode, findCIDByName } from "../../../../services/Consulta/ConsultaService";

const FormUpdateLaudo = ({ laudoData, setLaudoData, updateLaudo, setShow }) => {
    const laudoChange = (event) => {
        if (event.target.name === "dateTime") {
            setLaudoData({
                ...laudoData,
                dateTime: moment(event.target.value).format("DD/MM/yyyy - HH:mm"),
            });
        } else {
            setLaudoData({
                ...laudoData,
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
        console.log(laudoData);
        event.preventDefault();
        if (!laudoData.paciente) {
            console.log("a");
            setPacienteIsInvalid(true);
            setErrorPacienteMessage("Informe o paciente.");
            return;
        }
        if (!laudoData.conclusion) {
            console.log("b");
            setConclusionIsInvalid(true);
            return;
        }
        if (examTypeIsInvalid) {
            console.log("c");
            return;
        }
        if (resultIsInvalid) {
            console.log("d");
            return;
        }

        if (event.currentTarget.checkValidity() === false) {
            console.log("e");
            event.stopPropagation();
        } else {
            console.log(laudoData);
            updateLaudo();
        }

        setValidated(true);
    };

    const [examTypeError, setExamTypeError] = useState("Informe o tipo de exame.");
    const [examTypeIsInvalid, setExamTypeIsInvalid] = useState(false);
    useEffect(
        () => {
            const timeoutExamType = setTimeout(() => {
                console.log(laudoData);
                consultaExists({ ...laudoData, results: "" }).then((res) => {
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
        [laudoData.examType],
        [laudoData.paciente]
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
            console.log(file);
            setLaudoData({
                ...laudoData,
                results: file,
            });
        };

        window.open(URL.createObjectURL(selectedFile));
        fileReader.readAsDataURL(selectedFile);
    };

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };

    const [modifyFile, setModifyFile] = useState(false);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Identificador:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control defaultValue={laudoData.id} name="id" disabled type="number" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Resultados*:
                </Form.Label>
                <Col sm={10}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            modifyFile ? setModifyFile(false) : setModifyFile(true);
                        }}
                        className="form-control"
                        style={{ textAlign: "left" }}
                    >
                        Modificar arquivo
                    </button>
                    <div hidden={!modifyFile}>
                        <Col className="mb-3">
                            <Form.Control
                                isInvalid={resultIsInvalid}
                                accept=".pdf"
                                type="file"
                                onChange={handleConvertFile}
                            />

                            <Form.Control.Feedback tooltip type="invalid">
                                {resultsErrorMessage}
                            </Form.Control.Feedback>
                        </Col>
                    </div>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        defaultValue={moment(laudoData.dateTime, "DD/MM/YYYY - hh:mm").format("YYYY-MM-DDThh:mm:ss")}
                        max={moment(new Date()).format("YYYY-MM-DDThh:mm")}
                        required
                        name="dateTime"
                        type="datetime-local"
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
                    <Form.Control
                        disabled
                        defaultValue={laudoData.paciente.name + " - " + maskCPF(laudoData.paciente.cpf)}
                    ></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control disabled defaultValue={laudoData.examType}></Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Descrição*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        defaultValue={laudoData.description}
                        as="textarea"
                        onChange={laudoChange}
                        required
                        name="description"
                        type="text"
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
                        defaultInputValue={laudoData.conclusion.code + " - " + laudoData.conclusion.name}
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
                        onChange={(option) => {
                            setLaudoData({ ...laudoData, conclusion: option[0] });
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

export default FormUpdateLaudo;
