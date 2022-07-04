import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OpenNewWindow from "../../../../assets/open-new-window.svg";
import { getUsername } from "../../../../services/Login/LoginService";

const FormViewLaudo = ({ laudoData, openModalUpdate, openModalDelete, setShow }) => {
    const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        window.open(URL.createObjectURL(blob));
    };

    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Identificador:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control defaultValue={laudoData.id} disabled type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Resultados*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control defaultValue="Arquivo PDF com resultados" disabled />
                </Col>
                <Col className="print-container">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            b64toBlob(laudoData.results.slice(28), "application/pdf");
                        }}
                        className="btn-print-consulta"
                    >
                        <img className="img-print-consulta" src={OpenNewWindow} />
                    </button>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control defaultValue={laudoData.dateTime} disabled type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Paciente*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        disabled
                        defaultValue={laudoData.paciente.name + " - (" + maskCPF(laudoData.paciente.cpf) + ")"}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control defaultValue={laudoData.examType} type="text" disabled />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Descrição*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control disabled defaultValue={laudoData.description} type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Conclusão*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        disabled
                        defaultValue={laudoData.conclusion.code + " - " + laudoData.conclusion.name}
                        type="text"
                    />
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
                    {laudoData.status === "Provisório" && laudoData.medico.crm !== getUsername()
                        ? "Revisar"
                        : "Modificar"}
                </button>
            </div>
        </Form>
    );
};

export default FormViewLaudo;
