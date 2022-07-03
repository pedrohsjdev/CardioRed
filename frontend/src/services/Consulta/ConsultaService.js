import axios from "axios";
import { BASE_URL } from "../../utils/Consts";
import { getUsername, getAccessToken, setAuthorizationAxiosHeader } from "../Login/LoginService";
import { getMedicoByCRM } from "../Medico/MedicoService";
import moment from "moment";
import { generate } from "@pdfme/generator";
import { getPdfTemplate } from "./ConsultaPDFTemplate";

export const findAllConsultas = async (currentPage) => {
    try {
        setAuthorizationAxiosHeader(getAccessToken());
        const { data } = await axios.get(`${BASE_URL}/consultas?page=${currentPage}&size=10`);
        return data;
    } catch (error) {
        return [{}];
    }
};

export const findConsultasByPacienteCpf = (searchInput) => {
    return axios.get(`${BASE_URL}/consultas/find/cpf/like/${searchInput}`);
};

export const findConsultasByPacienteName = async (searchInput) => {
    return axios.get(`${BASE_URL}/consultas/find/name/like/${searchInput}`);
};

export const findCIDByCode = async (code) => {
    return axios.get(`${BASE_URL}/diseases/find/code/like/${code}`);
};

export const findCIDByName = async (name) => {
    return axios.get(`${BASE_URL}/diseases/find/name/like/${name}`);
};

export const getLastCosultaId = () => {
    return axios.get(`${BASE_URL}/consultas/getLastId`);
};

export const consultaAlreadyExistsSaving = async (consultaData) => {
    const consultaDataFormated = await toPostConsulta(consultaData, "post");
    return axios.post(`${BASE_URL}/consultas/consultaAlreadyExistsSaving`, consultaDataFormated);
};

export const consultaAlreadyExistsChanging = async (consultaData) => {
    const consultaDataFormated = await toPostConsulta(consultaData);
    return axios.put(`${BASE_URL}/consultas/consultaAlreadyExistsChanging`, consultaDataFormated);
};

export const toPostConsulta = async (consultaData, type) => {
    let dateTimeFormated = consultaData.dateTime;
    if (type === "post") {
        dateTimeFormated = moment(consultaData.dateTime).format("DD/MM/yyyy - HH:mm");
    }
    consultaData = {
        ...consultaData,
        dateTime: dateTimeFormated,
        status: "Ativo",
    };

    await getMedicoByCRM(getUsername()).then((response) => {
        consultaData = { ...consultaData, medico: response.data };
    });

    return consultaData;
};

export const saveConsulta = (consultaData) => {
    return axios.post(`${BASE_URL}/consultas`, consultaData);
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
        const response = await axios.delete(`${BASE_URL}/consultas/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const generatePDF = async (namePaciente, dataHoraConsulta) => {
    const template = {
        schemas: [
            {
                pacienteName: {
                    type: "text",
                    position: {
                        x: 44.88,
                        y: 56.62,
                    },
                    width: 120.2,
                    height: 6.99,
                    alignment: "center",
                    fontSize: 13,
                    characterSpacing: 0,
                    lineHeight: 1,
                },
                dataHora: {
                    type: "text",
                    position: {
                        x: 45.09,
                        y: 110.65,
                    },
                    width: 120.2,
                    height: 6.99,
                    alignment: "center",
                    fontSize: 13,
                    characterSpacing: 0,
                    lineHeight: 1,
                },
            },
        ],
        basePdf: getPdfTemplate(),
    };
    const inputs = [
        {
            pacienteName: namePaciente,
            dataHora: dataHoraConsulta,
        },
    ];

    const pdf = await generate({ template, inputs });

    // Browser
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
};
