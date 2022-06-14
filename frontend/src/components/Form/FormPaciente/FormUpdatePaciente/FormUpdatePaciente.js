import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

const FormUpdatePaciente = ({ pacienteData, setPacienteData, updatePaciente, setShow }) => {
    const pacienteChange = (event) => {
        if (event.target.name === "birthDate") {
            setPacienteData({
                ...pacienteData,
                [event.target.name]: moment(event.target.value).format("DD/MM/yyyy"),
            });
            return;
        }

        setPacienteData({
            ...pacienteData,
            [event.target.name]: event.target.value,
        });
    };

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        setValidated(true);

        if (!/^[0-9]+$/.test(pacienteData.cpf)) {
            return;
        }

        if (form.checkValidity() === true) {
            updatePaciente();
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Control hidden defaultValue={pacienteData.id} />
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    CPF*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        required
                        value={pacienteData.cpf}
                        type="text"
                        name="cpf"
                        maxLength="11"
                        onChange={pacienteChange}
                        isInvalid={!/^[0-9]+$/.test(pacienteData.cpf)}
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
                        defaultValue={pacienteData.name}
                        type="text"
                        name="name"
                        onChange={pacienteChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Sexo*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select
                        required
                        defaultValue={pacienteData.gender}
                        type="text"
                        name="gender"
                        onChange={pacienteChange}
                    >
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
                    <Form.Select
                        required
                        type="text"
                        name="ethnicity"
                        onChange={pacienteChange}
                        defaultValue={pacienteData.ethnicity}
                    >
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
                    <Form.Control
                        required
                        defaultValue={"".concat(
                            pacienteData.birthDate.slice(6, 10),
                            "-",
                            pacienteData.birthDate.slice(3, 5),
                            "-",
                            pacienteData.birthDate.slice(0, 2)
                        )}
                        type="date"
                        name="birthDate"
                        onChange={pacienteChange}
                    />
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

export default FormUpdatePaciente;
