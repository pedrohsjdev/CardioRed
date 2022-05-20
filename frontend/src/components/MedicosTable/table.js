import React from 'react'

const MedicosTable = (props) => {

    return (
        <>
            <table className="table table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">CRM</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Hierarquia</th>
                        <th scope="col">Ano Residência</th>
                        <th scope="col">Titulação</th>
                    </tr>
                </thead>
                <tbody>
                    {props.medicos.map((medico, index) => (
                        <tr
                            onClick={() => props.openModalView(medico)}
                            key={index}>
                            <td>{medico.crm}</td>
                            <td>{medico.name}</td>
                            <td>{medico.doctorType}</td>
                            <td>{medico.resindencyYear}</td>
                            <td>{medico.titulation}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">CRM</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Hierarquia</th>
                        <th scope="col">Ano Residência</th>
                        <th scope="col">Titulação</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default MedicosTable;