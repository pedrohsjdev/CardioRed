import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const FormViewMedico = ({ medicoData }) => {
    return (
        <Form>
            <Form.Control hidden defaultValue={medicoData.id} />
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    CRM*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control disabled defaultValue={medicoData.crm} type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Nome*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control disabled defaultValue={medicoData.name} type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Hierarquia*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select disabled defaultValue={medicoData.doctorType} type="text">
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
                    <Form.Control disabled type="number" defaultValue={medicoData.residencyYear} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Titulação*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select disabled defaultValue={medicoData.titulation} type="text">
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
                    <Form.Control disabled defaultValue={medicoData.password} type="text" />
                </Col>
            </Form.Group>
        </Form>
    );
};

export default FormViewMedico;
