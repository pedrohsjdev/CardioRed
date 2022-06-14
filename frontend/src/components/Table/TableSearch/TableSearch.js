import React from "react";

import "./TableSearch.css";

const TableSearch = ({ criteria, setSearchInput }) => {
    const placeholderText = "Buscar por " + criteria;

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
                        }}
                    />
                </form>
            </div>
        </>
    );
};

export default TableSearch;
