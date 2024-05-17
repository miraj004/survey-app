import axios from 'axios';
import {session} from "./contexts/AuthContextProvider.jsx";
import router from "./router.jsx";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api`
})


axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem(session.key)
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log('Request rejected!!!')
    try {
        if (error.response && error.response.status === 401) {
            // Unauthorized Error so we need to remove token from localStorage
            localStorage.removeItem(session.key)
            router.navigate('/login')
            return error;
        }
    } catch (error) {
        console.log('Navigate Error')
    }
    throw error
})

export default axiosClient
