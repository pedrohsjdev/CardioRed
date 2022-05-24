import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./FormCreateMedico.css";
import moment from "moment";

const FormCreateMedico = ({
    newMedicoData,
    setNewMedicoData,
    saveMedico,
    setShow,
}) => {
    const medicoChange = (event) => {
        if (event.target.value == 'Médico') {
            setIsResidenteDisabled(true)
            setIsDocenteDisabled(true)
        } else if (event.target.value == 'Docente') {
            setIsDocenteDisabled(false)
            setIsResidenteDisabled(true)
        } else if (event.target.value == 'Residente'){
            setIsDocenteDisabled(true)
            setIsResidenteDisabled(false)
        }
            setNewMedicoData({
                ...newMedicoData,
                [event.target.name]: event.target.value,
            });
    };

    const [isResidenteDisabled, setIsResidenteDisabled] = useState(false);
    const [isDocenteDisabled, setIsDocenteDisabled] = useState(false);
    const [validated, setValidated] = useState(false);
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        setValidated(true);

        if (form.checkValidity() === true) {
            saveMedico();
        }

        
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                CRM*:
            </Form.Label>
            <Col sm={10}>
                <Form.Control
                    required
                    maxLength={11}
                    name="crm"
                    onChange={medicoChange}
                    type="text"
                />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Nome*:
            </Form.Label>
            <Col sm={10}>
                <Form.Control
                    required
                    name="name"
                    onChange={medicoChange}
                    type="text"
                />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Hierarquia*:
            </Form.Label>
            <Col sm={10}>
                <Form.Select
                    required
                    name="doctorType"
                    onChange={medicoChange}
                    type="text"
                >
                    <option value="">Escolha uma opção</option>
                    <option value="Médico">Médico</option>
                    <option value="Docente">Docente</option>
                    <option value="Residente">Residente</option>
                </Form.Select>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Ano de Residência*:
            </Form.Label>
            <Col sm={10}>
                <Form.Control
                    required={isResidenteDisabled}
                    disabled={isResidenteDisabled}
                    name="residencyYear"
                    type="number"
                    onChange={medicoChange}
                />
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
                Titulação*:
            </Form.Label>
            <Col sm={8}>
                <Form.Select
                    onChange={medicoChange}
                    required={isDocenteDisabled}
                    disabled={isDocenteDisabled}
                    name="titulation"
                    type="text"
                >
                    <option value="">Escolha uma opção</option>
                    <option value="Doutor">Doutor</option>
                    <option value="Assistente">Assistente</option>
                    <option value="Livre-docente">Livre-docente</option>
                    <option value="Titular">Titular</option>
                </Form.Select>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
                Senha*:
            </Form.Label>
            <Col sm={8}>
                <Form.Control
                    onChange={medicoChange}
                    required
                    name="password"
                    type="text"
                />
            </Col>
        </Form.Group>
        <div className="modal-footer d-flex justify-content-between">
            <button
                type="button"
                className="btn btn-primary btn-modal btn-left"
                onClick={() => setShow(false)}
            >
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
