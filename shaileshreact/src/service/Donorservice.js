import axios from 'axios';
import axiosInstance from '../auth';


const  DONOR__BASE_REAT_API_URL="http://localhost:8080/api";

class Donorservice{
    getDonorin(){
        return axiosInstance.get(DONOR__BASE_REAT_API_URL);
    }
    readDonor(donor){
        return axiosInstance.post(DONOR__BASE_REAT_API_URL,donor);
    }
    
}




export default new Donorservice();
