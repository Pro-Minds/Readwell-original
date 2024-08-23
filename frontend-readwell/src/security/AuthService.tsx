import { jwtDecode } from 'jwt-decode'; // Default import
import { clearAuthToken } from './LogoutService';

interface DecodedToken {
    exp: number;
}

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
};

export const isTokenExpired = (): boolean => {
    const token = getCookie('token');
    if (!token) return true; // No token means expired
    const decoded = jwtDecode<DecodedToken>(token); // Use type assertion for decoded token
    return decoded.exp * 1000 < Date.now(); // Compare expiration time in milliseconds
};

export const logout = (): void => {
    clearAuthToken(); // Clear the token cookie
    window.location.href = '/admin/login';
};
