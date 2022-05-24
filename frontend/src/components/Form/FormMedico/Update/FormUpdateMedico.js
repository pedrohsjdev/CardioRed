import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormUpdateMedico = ({
    medicoData,
    setMedicoData,
    updateMedico,
    setShow,
}) => {
    useEffect(() => {
        verifyDoctorType(medicoData.doctorType);
    }, []);

    const verifyDoctorType = (doctorType) => {
        if (doctorType == "Médico") {
            setIsResidenteDisabled(true);
            setIsDocenteDisabled(true);
        } else if (doctorType == "Docente") {
            setIsDocenteDisabled(false);
            setIsResidenteDisabled(true);
        } else if (doctorType == "Residente") {
            setIsDocenteDisabled(true);
            setIsResidenteDisabled(false);
        }
    };

    const medicoChange = (event) => {
        if (event.target.name == "doctorType") {
            verifyDoctorType(event.target.value);
        }
        setMedicoData({
            ...medicoData,
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
            updateMedico();
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Control hidden defaultValue={medicoData.id} />
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
                        defaultValue={medicoData.crm}
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
                        defaultValue={medicoData.name}
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
                        defaultValue={medicoData.doctorType}
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
                <Form.Label column sm={4}>
                    Ano de Residência*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        required={isResidenteDisabled}
                        disabled={isResidenteDisabled}
                        name="residencyYear"
                        type="number"
                        onChange={medicoChange}
                        defaultValue={medicoData.residencyYear}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Titulação*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select
                        onChange={medicoChange}
                        required={isDocenteDisabled}
                        disabled={isDocenteDisabled}
                        name="titulation"
                        defaultValue={medicoData.titulation}
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
                <Form.Label column sm={2}>
                    Senha*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        onChange={medicoChange}
                        name="password"
                        defaultValue={medicoData.password}
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

export default FormUpdateMedico;
