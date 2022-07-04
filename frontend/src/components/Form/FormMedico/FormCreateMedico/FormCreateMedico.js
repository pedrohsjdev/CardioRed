import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getMedicoByCRM } from "../../../../services/Medico/MedicoService";
import "./FormCreateMedico.css";

const FormCreateMedico = ({ newMedicoData, setNewMedicoData, saveMedico, setShow }) => {
    const medicoChange = (event) => {
        setNewMedicoData({
            ...newMedicoData,
            [event.target.name]: event.target.value,
        });
        if (event.target.name === "crm") {
            setNewMedicoData({
                ...newMedicoData,
                [event.target.name]: event.target.value.toUpperCase(),
            });
        }
    };

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        if (event.currentTarget.checkValidity() === false || crmIsInvalid) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            saveMedico();
        }

        setValidated(true);
        event.preventDefault();
    };

    const patternCRM = new RegExp(/^[0-9]{4,9}-[a-zA-Z]{2}$/);
    const [crmErrorMessage, setCrmErrorMessage] = useState("Informe o CRM do médico.");
    const [crmIsInvalid, setCrmIsInvalid] = useState(false);
    const verifyCRM = () => {
        setCrmIsInvalid(false);
        getMedicoByCRM(newMedicoData.crm).then((res) => {
            if (res.data) {
                setCrmIsInvalid(true);
                setCrmErrorMessage("CRM já cadastrado no sistema.");
            }
        });
        if (!patternCRM.test(newMedicoData.crm)) {
            setCrmIsInvalid(true);
            setCrmErrorMessage("CRM inválido!");
        }
    };

    const patternPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    const [passwordMessageError, setPasswordMessageError] = useState("Informe uma senha de acesso ao sistema. ");
    const verifyPassword = (pass) => {
        if (!patternPassword.test(pass)) {
            setPasswordMessageError(
                "A senha deve ter, pelo menos, oito caracteres. Dentre esses, deve conter: 1 caractere especial, 1 caractere numérico, 1 caractere minúsculo e 1 caractere maiúsculo."
            );
        }
    };

    const [residencyYearMessageError, setResidencyYearMessageError] = useState(
        "Informe o ano de residência do residente."
    );
    const verifyResidencyYear = (year) => {
        const currentYear = new Date().getFullYear();
        if (year < 2000 || year > currentYear) {
            setResidencyYearMessageError("O ano deve estar entre 2000 e " + currentYear + ".");
        }
    };

    let typingTimer;
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    CRM*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        pattern={patternCRM.source}
                        autoComplete="off"
                        isInvalid={crmIsInvalid}
                        required
                        maxLength={11}
                        name="crm"
                        onKeyUp={() => {
                            clearTimeout(typingTimer);
                            typingTimer = setTimeout(verifyCRM, 1000);
                        }}
                        onKeyDown={() => clearTimeout(typingTimer)}
                        onChange={medicoChange}
                        type="text"
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        {crmErrorMessage}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Nome*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control autoComplete="off" required name="name" onChange={medicoChange} type="text" />
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe o nome do médico.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Hierarquia*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select required name="doctorType" onChange={medicoChange} type="text">
                        <option value="">Escolha uma opção</option>
                        <option value="Médico">Médico</option>
                        <option value="Docente">Docente</option>
                        <option value="Residente">Residente</option>
                    </Form.Select>
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a hierarquia do médico.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                    Ano de Residência*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        min={2000}
                        max={new Date().getFullYear()}
                        autoComplete="off"
                        required={newMedicoData.doctorType === "Residente"}
                        disabled={!(newMedicoData.doctorType === "Residente")}
                        name="residencyYear"
                        type="number"
                        onChange={(e) => {
                            medicoChange(e);
                            verifyResidencyYear(e.target.value);
                        }}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        {residencyYearMessageError}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Titulação*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select
                        onChange={medicoChange}
                        required={newMedicoData.doctorType === "Docente"}
                        disabled={!(newMedicoData.doctorType === "Docente")}
                        name="titulation"
                        type="text"
                    >
                        <option value="">Escolha uma opção</option>
                        <option value="Doutor">Doutor</option>
                        <option value="Assistente">Assistente</option>
                        <option value="Livre-docente">Livre-docente</option>
                        <option value="Titular">Titular</option>
                    </Form.Select>
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a titualação do docente.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Senha*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        pattern={patternPassword.source}
                        autoComplete="off"
                        onChange={(e) => {
                            medicoChange(e);
                            verifyPassword(e.target.value);
                        }}
                        required
                        name="password"
                        type="text"
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        {passwordMessageError}
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

export default FormCreateMedico;
