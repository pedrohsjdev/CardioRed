import React from "react";

const ModalView = ({ element, show, setShow, children, status }) => {
    if (!show) {
        return null;
    }

    element = status === "Provisório" ? "Laudo provisório" : element;

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">{element}</h5>
                        <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default ModalView;
