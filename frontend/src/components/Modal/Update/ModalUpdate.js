import React from "react";

const ModalUpdate = ({ element, updatePaciente, show, setShow, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">Modificando {element}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShow(false)}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-primary btn-modal btn-left"
                            onClick={() => setShow(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-modal"
                            onClick={updatePaciente}
                        >
                            Concluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalUpdate;
