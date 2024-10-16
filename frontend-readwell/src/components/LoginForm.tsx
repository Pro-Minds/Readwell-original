import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, loginUser } from '../services/apiService';
import styles from './RegistrationForm.module.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginUser({ email, password });
            const role = await getUserRole(); // Get the user role after login
            if (role === 'ADMIN') {
                navigate('/admin/panel');
            } else {
                navigate('/'); // Redirect to user dashboard or home
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form className={styles.regForm} onSubmit={handleSubmit}>
            <h1 className={styles.head}> Readwell - Admin Login</h1>
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
            <button className={styles.btn} type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
