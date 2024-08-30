import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../services/apiService'; // Use the new checkAuth function

interface ProtectedRouteProps {
    component: React.ComponentType;
    allowedRoles: string[]; // Accept an array of allowed roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, allowedRoles }) => {
    const [authStatus, setAuthStatus] = useState({
        loading: true,
        isAuth: false,
        role: '', // Initialize role as an empty string
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const { isAuthenticated, role = '' } = await checkAuth(); // Provide a default value for role
                setAuthStatus({ loading: false, isAuth: isAuthenticated, role });
            } catch (error) {
                console.error('Authentication check failed:', error);
                setAuthStatus({ loading: false, isAuth: false, role: '' });
            }
        };

        checkAuthStatus();
    }, []);

    if (authStatus.loading) {
        return <div>Loading...</div>;
    }

    // Check if the user role is allowed
    if (authStatus.isAuth && allowedRoles.includes(authStatus.role)) {
        return <Component />;
    }

    return <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
