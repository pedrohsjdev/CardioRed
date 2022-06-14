import React from "react";

const ModalView = ({ element, openModalUpdate, openModalDelete, show, setShow, children, formatDataToUpdate }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">{element}</h5>
                        <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                    </div>
                    <div className="modal-body">{children}</div>
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
                                if (element == "Paciente") {
                                    formatDataToUpdate();
                                }
                            }}
                        >
                            Modificar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalView;
