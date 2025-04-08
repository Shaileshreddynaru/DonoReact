import axios from 'axios';
import axiosInstance from '../auth';

const DONOR__BASE_REAT_API_URL = "http://localhost:8080/registar";

class AuthService {
    async readregister(user) {
        try {
            const response = await axiosInstance.post(DONOR__BASE_REAT_API_URL, user);
            return response.data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }
}

export default new AuthService();
