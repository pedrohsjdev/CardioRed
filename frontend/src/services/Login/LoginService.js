import axios from "axios";
import { BASE_URL } from "../../utils/Consts";
import jwt_decode from "jwt-decode";
import qs from "qs";

export const loginRequest = async (data) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/login`,
            qs.stringify({
                username: data.username,
                password: data.password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

export const saveTokens = (tokens) => {
    localStorage.setItem("access_token", tokens.access_token);
    setAuthorizationAxiosHeader(tokens.access_token);
};

export const userIsAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if (token === null) {
        return false;
    }

    if (jwt_decode(token).exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        return false;
    }

    setAuthorizationAxiosHeader(token);
    return true;
};

export const getUsername = () => {
    return jwt_decode(getAccessToken()).sub;
};

export const userIsAdm = () => {
    return jwt_decode(getAccessToken()).roles.includes("ROLE_ADM");
};

export const userIsDocente = () => {
    return jwt_decode(getAccessToken()).roles.includes("ROLE_DOCENTE");
};

export const userIsResidente = () => {
    return jwt_decode(getAccessToken()).roles.includes("ROLE_RESIDENTE");
};

export const userIsMedico = () => {
    return jwt_decode(getAccessToken()).roles.includes("ROLE_MEDICO");
};

export const userRoles = () => {
    return jwt_decode(getAccessToken()).roles;
};

export const getAccessToken = () => {
    return localStorage.getItem("access_token");
};

export const setAuthorizationAxiosHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const logoutUser = () => {
    localStorage.removeItem("access_token");
};
