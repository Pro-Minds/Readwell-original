import { clearAuthToken } from './LogoutService';

// interface DecodedToken {
//     exp: number;
// }
//
// export const isTokenExpired = async (): Promise<boolean> => {
//     try {
//         const response = await apiClient.get('/check-auth'); // No need for Authorization header
//         return response.data; // Should return true or false based on token validity
//     } catch (error) {
//         console.error('Token validity check failed:', error);
//         return false; // If there's an error, consider the token invalid
//     }
// };

export const logout = (): void => {
    clearAuthToken(); // Clear the token cookie
    window.location.href = '/admin/login';
};

