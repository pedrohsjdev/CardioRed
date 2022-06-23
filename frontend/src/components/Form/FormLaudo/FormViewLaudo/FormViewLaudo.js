import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const FormViewLaudo = ({ laudoData }) => {
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Identificador:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control name="id" disabled onChange={laudoChange} type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Resultados*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control disabled type="file" />
                    </Form.Group>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                    Data e Hora*:
                </Form.Label>
                <Col sm={9}>
                    <Form.Control disabled required name="dateTime" type="date" onChange={laudoChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                    Ano de Residência*:
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        required={!(newLaudoData.doctorType === "Residente")}
                        disabled={!(newLaudoData.doctorType === "Residente")}
                        name="residencyYear"
                        type="number"
                        onChange={laudoChange}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Paciente*:
                </Form.Label>
                <Col sm={10}>
                    <AsyncTypeahead
                        id="async-pacientes-selection"
                        isLoading={isLoading}
                        disabled
                        labelKey="name"
                        onSearch={handleSearch}
                        options={options}
                        minLength={1}
                        promptText="Buscar pacientes..."
                        searchText="Buscando..."
                        emptyLabel="Nenhum paciente encontrado."
                        onChange={(option) => setNewLaudoData({ ...newLaudoData, paciente: option })}
                        renderMenuItemChildren={(option) => (
                            <span>
                                {option.name} ({option.cpf})
                            </span>
                        )}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Exame*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Select onChange={laudoChange} disabled required name="examType">
                        <option value="">Escolha uma opção</option>
                        <option value="Ecocardiograma">Ecocardiograma</option>
                        <option value="Eletrocardiograma">Eletrocardiograma</option>
                        <option value="Mapa">Mapa</option>
                        <option value="Holter">Holter</option>
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Descrição*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={laudoChange} disabled required name="description" type="text" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Conclusão*:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={laudoChange} disabled required name="conclusion" type="text" />
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

export default FormViewLaudo;
