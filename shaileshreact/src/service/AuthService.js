import axios from 'axios';
import axiosInstance from '../auth';


const DONOR_BASE_REAT_API_URL = `${import.meta.env.VITE_API_URL}registar`;

class AuthService {
    async readregister(user) {
        try {

            const response = await axiosInstance.post(DONOR_BASE_REAT_API_URL, user);
            
            return response.data;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }
}

export default new AuthService();
