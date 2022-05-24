import React, {useState, useEffect} from 'react'
import axios from 'axios';

const MedicosTable = (props) => {
    const [medicos, setMedicos] = useState([{}]);

    useEffect(() => {
        const findMedicosByCRM = async () => {
            const { data } = await axios.get(
                `http://localhost:8080/medicos/find/crm/${props.searchInput}`
            );
            setMedicos([data.content]);
        };

        const fetchMedicos = async () => {
            const { data } = await axios.get(
                `http://localhost:8080/medicos?page=${props.currentPage}&size=10&sort=name`
            );
            setMedicos(data.content);
            props.setPageData(data);
        };
        console.log(props.searchInput)
        if (props.searchInput == "") {
            fetchMedicos();
        } else {
            findMedicosByCRM();
        }
    }, [props.currentPage, props.searchInput, props.refreshMedicoTable]);

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
                    {medicos.map((medico, index) => (
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