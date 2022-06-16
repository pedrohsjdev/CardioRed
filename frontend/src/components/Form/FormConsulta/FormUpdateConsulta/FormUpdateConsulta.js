import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormUpdateConsulta = ({ consultaData, setConsultaData, updateConsulta, setShow }) => {
    const consultaChange = (event) => {
        setConsultaData({
            ...consultaData,
            [event.target.name]: event.target.value,
        });
    };

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        setValidated(true);

        if (form.checkValidity() === true) {
            updateConsulta();
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Identificador*:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control defaultValue={consultaData.id} disabled name="id" onChange={consultaChange} type="number" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Paciente*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        defaultValue={consultaData.paciente?consultaData.paciente.name:""}
                        required
                        name="paciente"
                        onChange={consultaChange}
                        type="text"
                        placeholder="Buscar pacientes..."
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        defaultValue={consultaData.dateTime}
                        required
                        name="dateTime"
                        type="localDateTime"
                        onChange={consultaChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select
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
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                    Hipótese diagnóstica*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control defaultValue={consultaData.diagnosticAssumption} onChange={consultaChange} required name="diagnosticAssumption" type="text" />
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
