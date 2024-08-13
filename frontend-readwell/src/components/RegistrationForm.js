import React, { useState } from 'react';
import { registerUser } from '../apiService';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ email, password });
            alert('Registration successful! Please check your email for the OTP.');
            window.location.href = '/admin/verify-otp';
        } catch (error) {
            console.error(error);
            alert('Registration failed: ' + error.message);
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
