import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const FormViewPaciente = ({ pacienteData, openModalUpdate, openModalDelete, setShow }) => {
    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };
    return (
        <Form>
            <Form.Control hidden defaultValue={pacienteData.id} />
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    CPF*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control disabled defaultValue={maskCPF(pacienteData.cpf)} type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Nome*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control disabled defaultValue={pacienteData.name} type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Sexo*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select disabled defaultValue={pacienteData.gender} type="text">
                        <option value="">Escolha uma opção</option>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Cor*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select disabled type="text" defaultValue={pacienteData.ethnicity}>
                        <option value="">Escolha uma opção</option>
                        <option value="Branco">Branco</option>
                        <option value="Preto">Preto</option>
                        <option value="Pardo">Pardo</option>
                        <option value="Amarelo">Amarelo</option>
                        <option value="Indígena">Indígena</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                    Data de Nascimento*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control disabled defaultValue={pacienteData.birthDate} type="text" />
                </Col>
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

export default FormViewPaciente;
