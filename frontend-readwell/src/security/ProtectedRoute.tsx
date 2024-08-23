import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../apiService';

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
                const auth = await isAuthenticated();
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
