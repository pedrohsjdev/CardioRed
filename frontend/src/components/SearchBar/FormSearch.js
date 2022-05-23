import React from "react";

import "./FormSearch.css";

const FormSearch = ({ criteria, setSearchInput }) => {
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
                        onChange={(event) => {
                            setSearchInput(event.target.value);
                            console.log(event.target.value);
                        }}
                    />
                </form>
            </div>
        </>
    );
};

export default FormSearch;
