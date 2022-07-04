import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Printer from "../../../../assets/print-icon.svg";
import TaskChecked from "../../../../assets/task-checked.svg";
import "./FormViewConsulta.css";
import { generatePDF, updateConsulta } from "../../../../services/Consulta/ConsultaService";
import { Confirm, Notify } from "notiflix";

const FormViewConsulta = ({ consultaData, setConsultaData, openModalUpdate, openModalDelete, setShow }) => {
    const finishedConsulta = () => {
        Confirm.show(
            "Consulta realizada",
            "Deseja mudar o status da consulta para 'Aguardando laudo'?",
            "Sim",
            "Não",
            () => {
                updateConsulta({ ...consultaData, status: "Aguardando laudo" }).then(() => {
                    Notify.success("Status modificado.");
                });
                setConsultaData({ ...consultaData, status: "Aguardando laudo" });
            },
            () => {},
            {
                titleColor: "#b5303e",
                width: "350px",
                titleFontSize: "1.3rem",
                messageFontSize: "1rem",
                buttonsFontSize: "1rem",
                okButtonBackground: "#b5303e",
            }
        );
    };

    const renderPrintIcon = () => {
        if (consultaData.status === "Aguardando exame") {
            return (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        generatePDF(consultaData.paciente.name, consultaData.dateTime);
                    }}
                    className="btn-print-consulta"
                >
                    <img className="img-print-consulta" src={Printer} />
                </button>
            );
        }
    };
    const renderChangeStatusIcon = () => {
        if (consultaData.status === "Aguardando exame") {
            return (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        finishedConsulta();
                    }}
                    className="btn-print-consulta"
                >
                    <img className="img-print-consulta" src={TaskChecked} />
                </button>
            );
        }
    };
    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Identificador:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control defaultValue={consultaData.id} disabled type="number" />
                </Col>
                <Col className="print-container">{renderPrintIcon()}</Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Paciente:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        defaultValue={consultaData.paciente ? consultaData.paciente.name : ""}
                        disabled
                        type="text"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control defaultValue={consultaData.dateTime} disabled type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Exame:
                </Form.Label>
                <Col sm={9}>
                    <Form.Select defaultValue={consultaData.examType} disabled>
                        <option value="">Escolha uma opção</option>
                        <option value="Ecocardiograma">Ecocardiograma</option>
                        <option value="Eletrocardiograma">Eletrocardiograma</option>
                        <option value="Mapa">Mapa</option>
                        <option value="Holter">Holter</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Hipótese diagnóstica:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        defaultValue={
                            consultaData.diagnosticAssumption.code + " - " + consultaData.diagnosticAssumption.name
                        }
                        className="input-heigth-large"
                        disabled
                        type="text"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Status:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control value={consultaData.status} disabled type="text" />
                </Col>
                <Col className="print-container">{renderChangeStatusIcon()}</Col>
            </Form.Group>
            <div className="modal-footer d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-primary btn-modal btn-left"
                    onClick={() => {
                        openModalDelete();
                    }}
                >
                    Remover
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-modal"
                    onClick={() => {
                        setShow(false);
                        openModalUpdate();
                    }}
                >
                    Modificar
                </button>
            </div>
        </Form>
    );
};

export default FormViewConsulta;
