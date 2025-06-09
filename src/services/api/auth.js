// src/services/authService.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://e-commerce-pearl-omega.vercel.app/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const errorMessage = error.response.data?.message || 'Request failed';
      toast.error(errorMessage);
      return Promise.reject({
        message: errorMessage,
        fieldErrors: error.response.data?.errors
      });
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response from server');
      return Promise.reject({ message: 'No response from server' });
    } else {
      // Something happened in setting up the request
      toast.error('Request setup error');
      return Promise.reject({ message: error.message });
    }
  }
);

export const signUp = async (userData) => {
  return api.post('/auth/signup', {
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    cPassword: userData.cPassword
  });
};

export const signIn = async (credentials) => {
  return api.post('/auth/signin', {
    email: credentials.email,
    password: credentials.password
  });
};

export const sendCode = async (email) => {
  return api.post('/auth/sendCode', { email });
};

export const forgetPassword = async (data) => {
  return api.post('/auth/forgetpassword', {
    email: data.email,
    code: data.code,
    newPassword: data.newPassword
  });
};
export const verifyToken = async (token) => {
   return await api.get('/user/getUserById', { 
    headers: {
      Authorization: `Hamada__${token}`
    }
  });
  
};