import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:4000/",
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export default $api;
