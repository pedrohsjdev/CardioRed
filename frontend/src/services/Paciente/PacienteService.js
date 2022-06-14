import axios from "axios";
import { BASE_URL } from "../../utils/Consts";

export const findPacienteByCPF = async (searchInput) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/pacientes/cpf/${searchInput}`);
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
