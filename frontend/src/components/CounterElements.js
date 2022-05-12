import React from "react";

const CounterElements = ({ firstElement, lastElement, totalElements }) => {
  return (
    <>
      <span>
        Exibindo {firstElement} a {lastElement} de {totalElements} registros
      </span>
    </>
  );
};

export default CounterElements;
