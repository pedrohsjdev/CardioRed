import axios from "axios";
import { BASE_URL } from "../../utils/Consts";
import { getUsername, userIsResidente, userIsAdm } from "../Login/LoginService";
import { getMedicoByCRM } from "../Medico/MedicoService";
import { findByPacienteCpfExamTypeStatus } from "../Consulta/ConsultaService";
import moment from "moment";

export const findAllLaudos = (currentPage) => {
    return axios.get(`${BASE_URL}/laudos?page=${currentPage}&size=10`);
};

export const findAllLaudosResidenteUser = (crm, currentPage) => {
    return axios.get(`${BASE_URL}/laudos/DEFINITIVO/${crm}?page=${currentPage}&size=10&sort=paciente_name`);
};

export const findLaudosByPacienteCpf = (searchInput, currentPage) => {
    return axios.get(`${BASE_URL}/laudos/find/cpf/like/${searchInput}?page=${currentPage}&size=10`);
};

export const findLaudosByPacienteCpfToMedico = (searchInput, currentPage) => {
    return axios.get(`${BASE_URL}/laudos/find/DEFINITIVO/cpf/like/${searchInput}?page=${currentPage}&size=10`);
};

export const findLaudosByPacienteCpfToResidente = (searchInput, crm, currentPage) => {
    return axios.get(`${BASE_URL}/laudos/find/cpf/like/${searchInput}/DEFINITIVO/${crm}?page=${currentPage}&size=10`);
};

export const findLaudosByPacienteName = async (searchInput) => {
    return axios.get(`${BASE_URL}/laudos/find/name/like/${searchInput}`);
};

export const findLaudosByPacienteNameToMedico = (searchInput, currentPage) => {
    return axios.get(`${BASE_URL}/laudos/find/DEFINITIVO/name/like/${searchInput}?page=${currentPage}&size=10`);
};

export const findLaudosByPacienteNameToResidente = (searchInput, crm, currentPage) => {
    return axios.get(`${BASE_URL}/laudos/find/name/like/${searchInput}/DEFINITIVO/${crm}?page=${currentPage}&size=10`);
};

export const findLaudosByStatusNot = async (status) => {
    return axios.get(`${BASE_URL}/laudos/statusnot/${status}`);
};

export const getLastLaudoId = () => {
    return axios.get(`${BASE_URL}/laudos/getLastId`);
};

export const consultaExists = async (laudoData) => {
    return axios.post(`${BASE_URL}/laudos/consultaExists`, laudoData);
};

export const existsLaudoByPacienteCpf = (cpf) => {
    return axios.get(`${BASE_URL}/laudos/existsbycpf/${cpf}`);
};

export const existsLaudoByMedicoCrm = (crm) => {
    return axios.get(`${BASE_URL}/laudos/existsbycrm/${crm}`);
};

export const toPostLaudo = async (laudoData, type) => {
    laudoData = {
        ...laudoData,
        status: userIsResidente() ? "Provisório" : "Definitivo",
    };

    if (type === "post") {
        laudoData = {
            ...laudoData,
            dateTime: moment(laudoData.dateTime).format("DD/MM/yyyy - HH:mm"),
        };
    }

    if (!userIsAdm()) {
        await getMedicoByCRM(getUsername()).then((response) => {
            laudoData = { ...laudoData, medico: response.data };
        });
    }

    await findByPacienteCpfExamTypeStatus(
        laudoData.paciente.cpf,
        laudoData.examType.toUpperCase(),
        "AGUARDANDO_LAUDO"
    ).then((res) => {
        laudoData = {
            ...laudoData,
            consulta: res.data,
        };
    });

    return laudoData;
};

export const saveLaudo = (laudoData) => {
    return axios.post(`${BASE_URL}/laudos`, laudoData);
};

export const updateLaudo = (laudoData) => {
    return axios.put(`${BASE_URL}/laudos`, laudoData);
};

export const deleteLaudo = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/laudos/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
