import React from "react";

const FormSearch = ({ criteria }) => {
  const placeholderText = "Buscar por " + criteria;
  const style = {
    padding: "0.375rem 0.75rem",
    alignItems: "center",
    fontSize: "1.1rem",
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <span style={style}>Pesquisar:</span>
        <form>
          <input
            style={{ padding: "0.375rem 3.75rem 0.375rem 0.75rem" }}
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
