import jwt_decode from "jwt-decode";
import authToken from "./authToken";

const userAuth = () => {
    const token = localStorage.getItem("access_token");
    if (token === null) {
        return false;
    }

    if (jwt_decode(token).exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        return false;
    }

    authToken(localStorage.getItem("access_token"));
    return true;
};

export default userAuth;
