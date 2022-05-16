import React from "react";

const Pagination = ({ pagesNumber }) => {
    return (
        <>
            <nav>
                <ul className="pagination pagination-sm">
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Anterior
                        </a>
                    </li>
                    {pagesNumber.map((number) => (
                        <li key={number} className="page-item">
                            <a className="page-link" href="#">
                                {number}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Próximo
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
