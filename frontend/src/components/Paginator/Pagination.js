import React from "react";

const Pagination = (props) => {

    const previousPage = () => {
        props.updatePageNumber(props.pageNumber - 1)
        console.log(props.pageNumber)
    }
    const nextPage = () => {
        props.updatePageNumber(props.pageNumber + 1)
        console.log(props.pageNumber)
    }
    return (
        <>
            <nav>
                <ul className="pagination pagination-sm">
                    <li className="page-item">
                        <button className="page-link"
                            onClick={previousPage}
                            disabled={props.pageNumber == 0 ? true : false} >
                            Anterior
                        </button>
                    </li>
                    <li className="page-item">
                        <p className="page-link">{`${props.pageNumber + 1} de ${props.pageInfo.totalPages}`}</p>
                    </li>
                    <li className="page-item">
                        <button className="page-link"
                            onClick={nextPage} 
                            disabled={props.pageNumber == props.pageInfo.totalPages ? true : false}>
                            Próximo
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
