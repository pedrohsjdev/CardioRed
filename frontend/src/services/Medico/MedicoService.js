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

export const findAllMedicos = async (currentPage) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/medicos?page=${currentPage}&size=10&sort=name`);
        return data;
    } catch (error) {
        return [{}];
    }
};
