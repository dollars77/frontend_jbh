import axios from "axios";
import configapi from './configapi';

const api = axios.create({
    baseURL: `${configapi.API_SERVER}`,
    headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
    },
});

export default api;