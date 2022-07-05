import axios from "axios";
import { BASE_URL } from "../../utils/Consts";

export const findPacienteByCPF = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/pacientes/find/cpf/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const findAllPacientes = async (currentPage) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/pacientes?page=${currentPage}&size=10&sort=name`);
        return data;
    } catch (error) {
        return [{}];
    }
};

export const getPacientesByName = (name) => {
    return axios.get(`${BASE_URL}/pacientes/findList/name/like/${name}`);
};

export const findPacientesByName = (name, currentPage) => {
    return axios.get(`${BASE_URL}/pacientes/find/name/like/${name}?page=${currentPage}&size=10`);
};

export const findPacientesByCpf = (name, currentPage) => {
    return axios.get(`${BASE_URL}/pacientes/find/cpf/like/${name}?page=${currentPage}&size=10`);
};

export const getPacienteByCPF = (cpf) => {
    return axios.get(`${BASE_URL}/pacientes/find/cpf/${cpf}`);
};

export const savePaciente = async (pacienteData) => {
    try {
        const response = await axios.post(`${BASE_URL}/pacientes`, pacienteData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updatePaciente = async (pacienteData) => {
    try {
        const response = await axios.put(`${BASE_URL}/pacientes`, pacienteData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deletePaciente = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/pacientes/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
