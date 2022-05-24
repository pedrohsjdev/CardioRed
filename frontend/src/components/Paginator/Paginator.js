import React from "react";

const Paginator = ({ currentPage, totalPages, setCurrentPage }) => {
    const numberList = () => {
        const list = [];
        for (let i = 0; i < totalPages; i++) {
            list.push(i + 1);
        }

        if (list.length < 6) {
            return list;
        }

        let trimStart = 0,
            trimEnd = 5;

        if (currentPage < 3) {
            return list.slice(trimStart, trimEnd);
        }

        if (currentPage > list.length - 3) {
            trimStart = list.length - 5;
            trimEnd = list.length;
            return list.slice(trimStart, trimEnd);
        }

        if (currentPage > 2 && currentPage < list.length - 2) {
            trimStart = currentPage - 2;
            trimEnd = currentPage + 3;
        }

        return list.slice(trimStart, trimEnd);
    };

    const numbers = numberList(currentPage, totalPages);

    return (
        <>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            onClick={() => {
                                if (currentPage > 0) {
                                    setCurrentPage(currentPage - 1);
                                } else {
                                    setCurrentPage(0);
                                }
                            }}
                        >
                            Anterior
                        </a>
                    </li>
                    {numbers.map((number) => (
                        <li
                            className={
                                "page-item " +
                                (currentPage + 1 == number ? "active" : "")
                            }
                            key={number}
                        >
                            <a
                                className="page-link"
                                onClick={(event) => {
                                    setCurrentPage(
                                        Number(event.target.text) - 1
                                    );
                                }}
                                href="#"
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            onClick={() => {
                                if (currentPage < totalPages - 1) {
                                    setCurrentPage(currentPage + 1);
                                } else {
                                    setCurrentPage(totalPages - 1);
                                }
                            }}
                        >
                            Próximo
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Paginator;
