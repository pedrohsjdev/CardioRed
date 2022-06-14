import React from "react";

const TableCounter = ({ firstElement, lastElement, totalElements }) => {
    return (
        <>
            <span>
                Exibindo {firstElement} a {lastElement} de {totalElements} registros
            </span>
        </>
    );
};

export default TableCounter;
