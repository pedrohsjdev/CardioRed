import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Printer from "../../../../assets/print-icon.svg";
import "./FormViewConsulta.css";
import { generatePDF } from "../../../../services/Consulta/ConsultaService";

const FormViewConsulta = ({ consultaData }) => {
    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Identificador*:
                </Form.Label>
                <Col sm={3}>
                    <Form.Control defaultValue={consultaData.id} disabled name="id" type="number" />
                </Col>
                <Col className="print-container">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            generatePDF(consultaData.paciente.name, consultaData.dateTime);
                        }}
                        className="btn-print-consulta"
                    >
                        <img className="img-print-consulta" src={Printer} />
                    </button>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Paciente*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        defaultValue={consultaData.paciente ? consultaData.paciente.name : ""}
                        disabled
                        name="paciente"
                        type="text"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control defaultValue={consultaData.dateTime} disabled name="dateTime" type="localDateTime" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select defaultValue={consultaData.examType} disabled name="examType">
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
                    <Form.Control
                        defaultValue={
                            consultaData.diagnosticAssumption.code + " - " + consultaData.diagnosticAssumption.name
                        }
                        disabled
                        name="diagnosticAssumption"
                        type="text"
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export default FormViewConsulta;
