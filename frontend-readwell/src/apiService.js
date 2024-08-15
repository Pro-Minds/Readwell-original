import axios from 'axios';
import {jwtDecode} from "jwt-decode";

// const API_URL = 'http://localhost:8080/api';
const API_URL = 'http://10.49.63.86:8080/api';

export const fetchData = async () => {
    try {
        console.log('Fetching data from:', `${API_URL}/hello`);
        const response = await axios.get(`${API_URL}/hello`);
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/admin/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        if (response.status !== 200) {
            throw new Error('Registration failed');
        }
        // Handle successful registration
        return response.data; // Return the response data if needed
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; // Propagate the error for handling in the component
    }
};

export const verifyOtp = async ({ email, otp }) => {
    try {
        const response = await axios.post(`${API_URL}/admin/verify-otp`, { email, otp });
        const token = response.data; // Assuming the token is returned in the response data
        localStorage.setItem('token', token); // Store the token in local storage
        return token;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error verifying OTP');
    }
};

export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, loginData);
        if (response.status !== 200) {
            throw new Error('Login failed');
        }
        const token = response.data; // Assuming the token is returned in the response data
        localStorage.setItem('token', token); // Store the token

        // Decode the token to get expiration time
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

        // Set a timeout to refresh the token 5 minutes before expiration
        const refreshTime = expirationTime - Date.now() - 5 * 60 * 1000; // 5 minutes before expiration
        if (refreshTime > 0) {
            setTimeout(refreshToken, refreshTime);
        }

        return token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error; // Propagate the error for handling in the component
    }
};

const refreshToken = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}/admin/refresh-token`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            const newToken = response.data;
            localStorage.setItem('token', newToken); // Store the new token
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Optionally, handle token expiration (e.g., redirect to login)
    }
};
