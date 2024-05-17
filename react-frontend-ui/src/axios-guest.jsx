import axios from 'axios';

const axiosGuest = axios.create({
    baseURL: `${import.meta.env.VITE_API_BACKEND_URL}/api`
})

export default axiosGuest
