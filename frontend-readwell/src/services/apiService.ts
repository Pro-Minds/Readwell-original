import axios from 'axios';
import { logout } from '../security/AuthService';
import { User } from "../services/types";

const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

apiClient.interceptors.response.use(
    response => {
        console.log('API response:', response);
        return response;
    },
    error => {
        console.error('API error:', error);
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

// Check authentication and retrieve user role and details
export const checkAuth = async (): Promise<{ isAuthenticated: boolean; role?: string; user?: User }> => {
    try {
        const response = await apiClient.get('/check-auth'); // Automatically sends cookies
        return {
            isAuthenticated: response.data.isAuthenticated,
            role: response.data.role,
            user: response.data.user // Assuming you add user details to the response
        };
    } catch (error) {
        console.error('Authentication check failed:', error);
        return { isAuthenticated: false }; // Default to not authenticated
    }
};

// Register admin user
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

export const registerNormalUser = async (userData: UserData): Promise<any> => {
    try {
        const response = await apiClient.post('/register', userData);
        console.log('Register response:', response);
        return response.data;
    } catch (error) {
        console.error('Register failed:', error);
        throw error;
    }
};

// Verify OTP
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

// Login user
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

// Get user role using checkAuth
export const getUserRole = async (): Promise<string> => {
    const authResponse = await checkAuth();
    return authResponse.role || 'USER'; // Default to 'USER' if role is not found
};


export default apiClient;
