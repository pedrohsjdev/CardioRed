import axios from "axios";
import { BASE_URL } from "../../utils/Consts";

export const findMedicosByCRM = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/medicos/find/crm/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const getMedicoByCRM = (crm) => {
    return axios.get(`${BASE_URL}/medicos/find/crm/${crm}`);
};

export const findMedicosByName = (name, currentPage) => {
    return axios.get(`${BASE_URL}/medicos/find/name/like/${name}?page=${currentPage}&size=10`);
};

export const findMedicosByCrm = (crm, currentPage) => {
    return axios.get(`${BASE_URL}/medicos/find/crm/like/${crm}?page=${currentPage}&size=10`);
};

export const findAllMedicos = async (currentPage) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/medicos?page=${currentPage}&size=10&sort=name`);
        return data;
    } catch (error) {
        return [{}];
    }
};

export const saveMedico = async (medicoData) => {
    try {
        console.log(medicoData);
        const response = await axios.post(`${BASE_URL}/medicos`, medicoData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateMedico = async (medicoData) => {
    try {
        const response = await axios.put(`${BASE_URL}/medicos`, medicoData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteMedico = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/medicos?id=${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
