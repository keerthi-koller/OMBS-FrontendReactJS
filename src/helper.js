import axios from "axios";

export const BASE_URL='http://localhost:8080';

export const myAxios=axios.create({
    baseURL:BASE_URL,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})
