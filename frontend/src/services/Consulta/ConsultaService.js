import axios from "axios";
import { BASE_URL } from "../../utils/Consts";
import { getUsername, getAccessToken, setAuthorizationAxiosHeader, userIsAdm } from "../Login/LoginService";
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

export const findByPacienteCpfExamTypeStatus = (cpf, examType, status) => {
    return axios.get(`${BASE_URL}/consultas/find/cpf/examtype/status?cpf=${cpf}&examType=${examType}&status=${status}`);
};

export const existsConsultaByPacienteCpf = (cpf) => {
    return axios.get(`${BASE_URL}/consultas/existsbycpf/${cpf}`);
};

export const existsConsultaByMedicoCrm = (crm) => {
    return axios.get(`${BASE_URL}/consultas/existsbycrm/${crm}`);
};

export const toPostConsulta = async (consultaData, type) => {
    let dateTimeFormated = consultaData.dateTime;
    if (type === "post") {
        dateTimeFormated = moment(consultaData.dateTime).format("DD/MM/yyyy - HH:mm");
    }
    consultaData = {
        ...consultaData,
        dateTime: dateTimeFormated,
        status: "Aguardando exame",
    };
    if (!userIsAdm()) {
        await getMedicoByCRM(getUsername()).then((response) => {
            consultaData = { ...consultaData, medico: response.data };
        });
    }

    return consultaData;
};

export const saveConsulta = (consultaData) => {
    return axios.post(`${BASE_URL}/consultas`, consultaData);
};

export const updateConsulta = (consultaData) => {
    return axios.put(`${BASE_URL}/consultas`, consultaData);
};

export const deleteConsulta = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/consultas/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const generatePDF = async (consultaData) => {
    const template = {
        schemas: [
            {
                diagnosticAssumption: {
                    type: "text",
                    position: {
                        x: 29.83,
                        y: 153.51,
                    },
                    width: 149.99,
                    height: 20.51,
                    fontSize: 13,
                    fontColor: "#000000",
                    alignment: "center",
                    lineHeight: 1.1,
                },
                medico: {
                    type: "text",
                    position: {
                        x: 30.36,
                        y: 180.27,
                    },
                    width: 149.46,
                    height: 8.35,
                    fontSize: 13,
                    fontColor: "#000000",
                    alignment: "center",
                    lineHeight: 1.3,
                },
                id: {
                    type: "text",
                    position: {
                        x: 2,
                        y: 0.06,
                    },
                    width: 32.52,
                    height: 8.35,
                    fontSize: 13,
                    fontColor: "#000000",
                    alignment: "left",
                },
                exam: {
                    type: "text",
                    position: {
                        x: -0.07,
                        y: 127.59,
                    },
                    width: 209.79,
                    height: 8.35,
                    fontSize: 13,
                    fontColor: "#000000",
                    alignment: "center",
                },
                dateTime: {
                    type: "text",
                    position: {
                        x: -0.07,
                        y: 101.25,
                    },
                    width: 209.79,
                    height: 8.35,
                    fontSize: 13,
                    fontColor: "#000000",
                    alignment: "center",
                },
                pacienteName: {
                    type: "text",
                    position: {
                        x: -0.07,
                        y: 75.44,
                    },
                    width: 209.79,
                    height: 8.35,
                    fontSize: 13,
                    fontColor: "#000000",
                    alignment: "center",
                },
            },
        ],
        basePdf: getPdfTemplate(),
    };
    console.log(consultaData);
    const inputs = [
        {
            diagnosticAssumption:
                consultaData.diagnosticAssumption.code + " - " + consultaData.diagnosticAssumption.name,
            medico: consultaData.medico.name + " (" + consultaData.medico.crm + ")",
            id: "Nº " + consultaData.id,
            exam: consultaData.examType,
            dateTime: consultaData.dateTime,
            pacienteName: consultaData.paciente.name + " (" + maskCPF(consultaData.paciente.cpf) + ")",
        },
    ];

    const pdf = await generate({ template, inputs });

    // Node.js
    // fs.writeFileSync(path.join(__dirname, 'test.pdf'), pdf);

    // Browser
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));
};

const maskCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
};
