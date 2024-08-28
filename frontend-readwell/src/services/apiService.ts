import axios from 'axios';
import { logout } from '../security/AuthService';
import { User } from "../services/types";
import { isTokenExpired } from '../security/AuthService';

const API_URL = 'http://10.49.63.86:8080/api';

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => {
        console.log('API response:', response); // Log successful responses
        return response;
    },
    error => {
        console.error('API error:', error); // Log errors
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
        if (isTokenExpired()) {
            return false;
        }
        await apiClient.get('/admin/check-auth');
        return true;
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false;
    }
};

export const registerUser = async (userData: UserData): Promise<any> => {
    try {
        const response = await apiClient.post('/admin/register', userData);
        console.log('Register response:', response);
        return response.data;
    } catch (error) {
        console.error('Register failed:', error);
        throw error;
    }
};

export const verifyOtp = async (otpData: OtpData): Promise<any> => {
    try {
        const response = await apiClient.post('/admin/verify-otp', otpData);
        console.log('Verify OTP response:', response);
        return response.data;
    } catch (error) {
        console.error('Verify OTP failed:', error);
        throw error;
    }
};

export const loginUser = async (loginData: LoginData): Promise<any> => {
    try {
        const response = await apiClient.post('/admin/login', loginData);
        console.log('Login response:', response);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const getUserRole = async (token: string): Promise<string> => {
    try {
        const response = await fetchUserDetails(token);
        console.log('Get user role response:', response);
        return response.isAdmin ? 'ADMIN' : 'USER';
    } catch (error) {
        console.error('Failed to fetch user role:', error);
        return 'USER'; // Default role
    }
};

export const fetchUserDetails = async (token: string): Promise<User> => {
    if (isTokenExpired()) {
        throw new Error('Token expired');
    }

    try {
        const response = await apiClient.get('/user/details', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Fetch user details response:', response);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user details:', error);
        throw error;
    }
};

export default apiClient;
