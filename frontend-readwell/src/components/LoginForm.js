import React, { useState } from 'react';
import { loginUser } from '../apiService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state on new submission
        try {
            const token = await loginUser({ email, password });
            localStorage.setItem('token', token); // Store JWT token
            alert('Login successful');
            window.location.href = '/admin'; // Redirect to admin dashboard
        } catch (error) {
            console.error(error);
            setError(error.message || 'Login failed'); // Set error message from the response
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </form>
    );
};

export default LoginForm;
