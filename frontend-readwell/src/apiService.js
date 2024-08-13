import axios from 'axios';

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
        return response.data; // Assuming the token is returned in the response data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error verifying OTP');
    }
};

export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            throw new Error('Login failed');
        }
        return response.data.token; // Return the JWT token
    } catch (error) {
        console.error('Error during login:', error);
        throw new Error(error.response?.data || 'Error during login'); // Propagate the error for handling in the component
    }
};


