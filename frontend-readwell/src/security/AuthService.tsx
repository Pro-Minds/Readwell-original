import { jwtDecode } from 'jwt-decode'; // Default import
import { clearAuthToken } from './LogoutService';

interface DecodedToken {
    exp: number;
}

export const getCookie = (name: string): string | undefined => {
    console.log('Document cookies:', document.cookie); // Log all cookies
    const value = document.cookie;
    console.log('Document cookies:', value); // Log all cookies for debugging

    const parts = value.split(`${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        console.log(`Cookie value for ${name}:`, cookieValue); // Log the specific cookie value
        return cookieValue;
    }
    console.log(`Cookie ${name} not found`);
    return undefined;
};

export const isTokenExpired = (): boolean => {
    const token = getCookie('token');
    if (!token) return true; // No token means expired
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
};

export const logout = (): void => {
    clearAuthToken(); // Clear the token cookie
    window.location.href = '/admin/login';
};

