import axios from 'axios';

export const logout = async () => {
    try {
        await axios.post('/api/admin/logout', {}, { withCredentials: true });
        alert('Successfully logged out');
        // Redirect the user to the login page
        window.location.href = '/admin/login';
    } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
    }
};

export const clearAuthToken = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
