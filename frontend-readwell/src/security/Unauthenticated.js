import React from 'react';
import { Link } from 'react-router-dom';

const Unauthenticated = () => {
    return (
        <div>
            <h1>You are not authenticated</h1>
            <p>Please log in or register to access the admin panel.</p>
            <Link to="/admin/login">Login</Link>
            <Link to="/admin/register">Register</Link>
        </div>
    );
};

export default Unauthenticated;
