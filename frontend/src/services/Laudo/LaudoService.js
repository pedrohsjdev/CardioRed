import axios from "axios";
import { BASE_URL } from "../../utils/Consts";

export const findAllLaudos = async (currentPage) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/laudos?page=${currentPage}&size=10`);
        return data;
    } catch (error) {
        return [{}];
    }
};

export const findLaudosByPacienteCpf = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/laudos/cpf/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const findLaudosByPacienteName = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/laudos/find/${searchInput}`);
        return [data];
    } catch (error) {
        return [{}];
    }
};

export const saveLaudo = async (laudoData) => {
    try {
        console.log(laudoData);
        const response = await axios.post(`${BASE_URL}/laudos`, laudoData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const updateLaudo = async (laudoData) => {
    try {
        const response = await axios.put(`${BASE_URL}/laudos`, laudoData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deleteLaudo = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/laudos?id=${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
