import axios from 'axios';
import cors from 'cors';
import axiosInstance from '../auth';


const  DONOR__BASE_REAT_API_URL=`${import.meta.env.VITE_API_URL}post`;

class PostService{
  
    getPost(){
        return axiosInstance.get(DONOR__BASE_REAT_API_URL);
    }
    readPost(posts){
        return axiosInstance.post(DONOR__BASE_REAT_API_URL,posts);
    }
}




export default new PostService();
