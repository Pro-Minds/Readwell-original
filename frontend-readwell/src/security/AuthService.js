import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token) => {
    if (!token) return true; // No token means expired
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Compare expiration time
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login'; // Redirect to login
};
