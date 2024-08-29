import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNormalUser} from "../../services/apiService";

const UserRegistrationForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await registerNormalUser({ email, password }); // Call the normal user registration function
            navigate(`/verify-otp?email=${email}`); // Redirect to OTP verification page
        } catch (error) {
            console.error('Registration failed:', error);
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
            <button type="submit">Register</button>
        </form>
    );
};

export default UserRegistrationForm;
