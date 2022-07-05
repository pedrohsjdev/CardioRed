import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import { getPacienteByCPF } from "../../../../services/Paciente/PacienteService";

const FormUpdatePaciente = ({ pacienteData, setPacienteData, updatePaciente, setShow }) => {
    const pacienteChange = (event) => {
        if (event.target.name === "birthDate") {
            setPacienteData({
                ...pacienteData,
                [event.target.name]: moment(event.target.value).format("DD/MM/yyyy"),
            });
            return;
        }
        if (event.target.name === "name") {
            const inputed = event.target.value;
            setPacienteData({
                ...pacienteData,
                name: inputed.charAt(0).toUpperCase() + inputed.slice(1),
            });
            return;
        }

        if (event.target.name === "cpf") {
            const inputed = event.target.value;
            setPacienteData({
                ...pacienteData,
                cpf: event.target.value.replaceAll(".", "").replace("-", ""),
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
        event.preventDefault();

        if (!validateCPF(pacienteData.cpf)) {
            setCpfIsInvalid(true);
            setCpfErrorMessage("CPF inválido!");
            return;
        }
        if (cpfIsInvalid) {
            return;
        }
        if (event.currentTarget.checkValidity() === false) {
            event.stopPropagation();
        } else {
            updatePaciente();
        }

        setValidated(true);
    };

    const [cpfErrorMessage, setCpfErrorMessage] = useState("Informe o CPF do paciente.");
    const [cpfIsInvalid, setCpfIsInvalid] = useState(false);
    const verifyCPF = () => {
        getPacienteByCPF(pacienteData.cpf).then((res) => {
            if (res.data) {
                setCpfIsInvalid(true);
                setCpfErrorMessage("CPF já cadastrado no sistema.");
            } else {
                setCpfIsInvalid(false);
            }
        });
    };

    const validateCPF = (strCPF) => {
        let sum;
        let remainder;
        sum = 0;
        if (
            strCPF === undefined ||
            strCPF.length != 11 ||
            strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999"
        )
            return false;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder == 10 || remainder == 11) remainder = 0;
        if (remainder != parseInt(strCPF.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder == 10 || remainder == 11) remainder = 0;
        if (remainder != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    };

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };

    let typingTimer;
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Control hidden defaultValue={pacienteData.id} />
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    CPF*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        pattern="^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$"
                        autoComplete="off"
                        required
                        isInvalid={cpfIsInvalid}
                        value={pacienteData.cpf ? maskCPF(pacienteData.cpf) : ""}
                        type="text"
                        name="cpf"
                        maxLength="14"
                        onKeyUp={() => {
                            clearTimeout(typingTimer);
                            typingTimer = setTimeout(verifyCPF, 1000);
                        }}
                        onKeyDown={(e) => {
                            clearTimeout(typingTimer);
                        }}
                        onChange={pacienteChange}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        {cpfErrorMessage}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Nome*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        autoComplete="off"
                        required
                        defaultValue={pacienteData.name}
                        type="text"
                        name="name"
                        onChange={pacienteChange}
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe o nome do paciente.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe o sexo do paciente.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a cor do paciente.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                    Data de Nascimento*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        max={moment(new Date()).format("YYYY-MM-DD")}
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
                    <Form.Control.Feedback tooltip type="invalid">
                        Informe a data de nascimento do paciente.
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

export default FormUpdatePaciente;
