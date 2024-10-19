import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/apiService'; // Assuming this is a utility function to call the API
import  styles  from './RegistrationForm.module.css';

const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await registerUser({ email, password });
            navigate(`/verify-otp?email=${email}`); // Redirect to OTP verification page
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form className={styles.regForm} onSubmit={handleSubmit}>
            <h1 className={styles.head}> Readwell - Admin Registration </h1>
            <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <button className={styles.btn} type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
