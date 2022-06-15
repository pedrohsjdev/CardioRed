import axios from "axios";
import { BASE_URL } from "../../utils/Consts";

export const findAllConsultas = async (currentPage) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/consultas?page=${currentPage}&size=10`);
        return data;
    } catch (error) {
        return [{}];
    }
};

export const findConsultasByPacienteCpf = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/consultas/find/cpf/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const findConsultasByPacienteName = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/consultas/find/name/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const saveConsulta = async (consultaData) => {
    try {
        console.log(consultaData);
        const response = await axios.post(`${BASE_URL}/consultas`, consultaData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateConsulta = async (consultaData) => {
    try {
        const response = await axios.put(`${BASE_URL}/consultas`, consultaData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteConsulta = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/consultas?id=${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
