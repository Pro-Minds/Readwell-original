import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole, loginUser } from '../services/apiService';
import { getCookie } from '../security/AuthService'; // Import cookie utility

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginUser({ email, password });

            // Wait a moment for the cookie to be set
            setTimeout(async () => {
                const token = getCookie('token');
                if (token) {
                    const role = await getUserRole(token);
                    if (role === 'ADMIN') {
                        navigate('/admin/panel');
                    } else {
                        navigate('/');
                    }
                } else {
                    console.error('Token not found');
                }
            }, 1000); // Adjust the timeout as necessary

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
