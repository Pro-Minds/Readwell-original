import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/apiService'; // Ensure this uses the cookie
import { isTokenExpired} from "../security/AuthService";

interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const [authStatus, setAuthStatus] = useState({
        loading: true,
        isAuth: false,
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if the token is expired
                if (isTokenExpired()) {
                    setAuthStatus({ loading: false, isAuth: false });
                    return;
                }
                // Use the API to check authentication or check the token directly
                const auth = await isAuthenticated(); // This should check the cookie
                setAuthStatus({ loading: false, isAuth: auth });
            } catch (error) {
                console.error('Authentication check failed:', error);
                setAuthStatus({ loading: false, isAuth: false });
            }
        };

        checkAuth();
    }, []); // Empty dependency array ensures this runs only once on mount

    if (authStatus.loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return authStatus.isAuth ? <Component /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
