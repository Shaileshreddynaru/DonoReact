import axios from 'axios';
import axiosInstance from '../auth';
const DONOR__BASE_REAT_API_URL = `${import.meta.env.VITE_API_URL}login`;

class Login {
    async login(dto) {
        try {
            const response = await axiosInstance.post(DONOR__BASE_REAT_API_URL, { ...dto });
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }
}

export default new Login();
