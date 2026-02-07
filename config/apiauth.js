import axios from "axios";
import configapi from './configapi';
import { TOKEN_KEY } from "./token_key";
import Cookies from "js-cookie";

const apiauth = axios.create({
    baseURL: `${configapi.API_SERVER}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
apiauth.interceptors.request.use(
    (config) => {
        const token = Cookies.get(TOKEN_KEY);
        if (token) {
            config.headers['xaccesstoken'] = token;
        }
        return config;
    },
    (error) => {
         if (error.response?.status === 401) {
            // Token หมดอายุ - redirect ไป login
            Cookies.remove(TOKEN_KEY);
            localStorage.removeItem(`${TOKEN_KEY}`);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiauth;