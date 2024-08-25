import axios from 'axios';
import { logout } from '../security/AuthService'

const API_URL = 'http://10.49.63.86:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

interface UserData {
    email: string;
    password: string;
}

interface OtpData {
    email: string;
    otp: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        await apiClient.get('/admin/check-auth');
        return true;
    } catch {
        return false;
    }
};

export const registerUser = async (userData: UserData): Promise<any> => {
    const response = await apiClient.post('/admin/register', userData);
    return response.data;
};

export const verifyOtp = async (otpData: OtpData): Promise<any> => {
    const response = await apiClient.post('/admin/verify-otp', otpData);
    return response.data;
};

export const loginUser = async (loginData: LoginData): Promise<any> => {
    const response = await apiClient.post('/admin/login', loginData);
    return response.data;
};

export const fetchProtectedData = async (): Promise<any> => {
    const response = await apiClient.get('/protected/data');
    return response.data;
};

export default apiClient;
