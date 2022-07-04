import React, { useState } from "react";

import "./TableSearch.css";

const TableSearch = ({ criteria, setSearchInput, searchInput }) => {
    const maskCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return cpf;
    };

    const isLetter = (char) => {
        if (typeof char !== "string") {
            return false;
        }

        return char.toLocaleLowerCase() !== char.toUpperCase();
    };

    if (criteria.includes("CPF")) {
        return (
            <>
                <div className="d-flex justify-content-between mt-5">
                    <span className="label">Pesquisar:</span>
                    <form>
                        <input
                            value={isLetter(searchInput.charAt(0)) ? searchInput : maskCPF(searchInput)}
                            type="text"
                            maxLength={isLetter(searchInput.charAt(0)) ? "" : 14}
                            className="form-control"
                            placeholder={criteria}
                            onChange={(event) => {
                                setSearchInput(event.target.value.replaceAll(".", "").replace("-", ""));
                            }}
                        />
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="d-flex justify-content-between mt-5">
                    <span className="label">Pesquisar:</span>
                    <form>
                        <input
                            type="text"
                            maxLength={isLetter(searchInput.charAt(0)) ? "" : 14}
                            className="form-control"
                            placeholder={criteria}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                        />
                    </form>
                </div>
            </>
        );
    }
};

export default TableSearch;
