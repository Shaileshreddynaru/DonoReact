import axios from 'axios';
import axiosInstance from '../auth';
const DONOR__BASE_REAT_API_URL = "http://localhost:8080/login";

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
