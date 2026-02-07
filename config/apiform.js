import axios from "axios";
import configapi from './configapi';
import { TOKEN_KEY } from "./token_key";
import Cookies from "js-cookie";

  const token = Cookies.get(TOKEN_KEY);
const apiForm = axios.create({
    withCredentials: true,
    baseURL: `${configapi.API_SERVER}`,
    headers: { 
        Accept: 'application/json', 
        "Content-Type": "multipart/form-data" 
    },
});
apiForm.interceptors.request.use(
    (config) => {
      
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
export default apiForm;