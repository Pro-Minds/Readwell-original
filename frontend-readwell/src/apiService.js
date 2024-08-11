import axios from 'axios';

// const API_URL = 'http://localhost:8080/api';

// Replace localhost with the actual IP address of VM
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