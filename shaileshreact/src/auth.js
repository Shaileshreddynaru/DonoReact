import axios from 'axios';

const axiosInstance = axios.create({
  // You can also add default headers here
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in local storage

    if (token) {
      config.headers={"Authorization" : `Bearer ${token}`}

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
