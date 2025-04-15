
import axiosInstance from '../auth';


const  DONOR__BASE_REAT_API_URL=`${import.meta.env.VITE_API_URL}api`;

class Donorservice{
    getDonorin(){
        return axiosInstance.get(DONOR__BASE_REAT_API_URL);
    }
    readDonor(donor){
        return axiosInstance.post(DONOR__BASE_REAT_API_URL,donor);
    }
    
}




export default new Donorservice();
