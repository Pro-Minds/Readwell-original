import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired, getToken, logout } from './AuthService';
import Unauthenticated from './Unauthenticated';

const ProtectedRoute = ({ children }) => {
    const token = getToken();

    if (isTokenExpired(token)) {
        logout(); // Clear token and redirect to login
        return <Navigate to="/admin/login" />;
    }

    if (!token) {
        return <Unauthenticated />; // Show unauthenticated message
    }

    return children; // Render the protected component
};

export default ProtectedRoute;
