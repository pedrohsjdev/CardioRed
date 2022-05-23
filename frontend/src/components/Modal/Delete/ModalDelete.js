import React from "react";

import "./ModalDelete.css";

const ModalDelete = ({ element, show, setShow, deletePaciente }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-sm modal-dialog-centered modal-delete">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">{element}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShow(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        Tem certeza que deseja remover o {element.toLowerCase()}{" "}
                        selecionado?
                    </div>
                    <div className="modal-footer d-flex justify-content-between modal-footer-delete">
                        <button
                            type="button"
                            className="btn btn-primary btn-modal-delete btn-left"
                        >
                            Não
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-modal-delete"
                            onClick={deletePaciente}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
