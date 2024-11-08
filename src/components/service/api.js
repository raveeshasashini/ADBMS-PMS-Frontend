import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080/api/users', // Change this to match your actual API endpoint
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;