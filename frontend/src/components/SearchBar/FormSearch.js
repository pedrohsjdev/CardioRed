import React from "react";

import "./FormSearch.css";

const FormSearch = ({ criteria }) => {
    const placeholderText = "Buscar por " + criteria;
    const style = {};

    return (
        <>
            <div className="d-flex justify-content-between mt-5">
                <span className="label">Pesquisar:</span>
                <form>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholderText}
                    />
                </form>
            </div>
        </>
    );
};

export default FormSearch;
