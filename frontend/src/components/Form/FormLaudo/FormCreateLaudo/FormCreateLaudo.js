import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { findPacientesByName } from "../../../../services/Paciente/PacienteService";

const FormCreateLaudo = ({
  newLaudoData,
  setNewLaudoData,
  saveLaudo,
  setShow,
}) => {
  const laudoChange = (event) => {
    setNewLaudoData({
      ...newLaudoData,
      [event.target.name]: event.target.value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleSearch = (query) => {
    setIsLoading(true);

    findPacientesByName(query)
      .then((response) => {
        setOptions(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setValidated(true);

    if (form.checkValidity() === true) {
      saveLaudo();
    }
  };

  const handleConvertFile = (event) => {
    let selectedFile = event.target.files;
    let file = null;
    let fileName = "";
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      fileName = fileToLoad.name;
      // FileReader function for read the file.
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent.target.result;
        // Print data in console
        console.log(file);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }

    this.setState({
      fileData: file,
      fileName: fileName,
    });
    laudoChange(this.file);
  };

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
            <Form.Control type="file" onChange={handleConvertFile} />
          </Form.Group>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={3}>
          Data e Hora*:
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            required
            name="dateTime"
            type="datetime-local"
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
            labelKey="name"
            onSearch={handleSearch}
            options={options}
            minLength={1}
            promptText="Buscar pacientes..."
            searchText="Buscando..."
            emptyLabel="Nenhum paciente encontrado."
            onChange={(option) =>
              setNewLaudoData({ ...newLaudoData, paciente: option[0] })
            }
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
          <Form.Select onChange={laudoChange} required name="examType">
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
          <Form.Control
            onChange={laudoChange}
            required
            name="description"
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Conclusão*:
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            onChange={laudoChange}
            required
            name="conclusion"
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

export default FormCreateLaudo;
