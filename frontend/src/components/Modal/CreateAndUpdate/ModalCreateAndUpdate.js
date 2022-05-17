import React from "react";

import "./ModalCreateAndUpdate.css";

const ModalCreateAndUpdate = (props) => {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => props.setShow(false)}
                        ></button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-primary btn-modal btn-left"
                            onClick={() => props.setShow(false)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-modal"
                        >
                            Concluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCreateAndUpdate;
