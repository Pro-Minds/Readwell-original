import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserRole, verifyOtp } from '../services/apiService';

const OTPVerification: React.FC = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) {
            console.error('Email is required for OTP verification');
            return;
        }

        try {
            await verifyOtp({ email, otp });
            const role = await getUserRole(); // Get the user role after OTP verification
            if (role === 'ADMIN') {
                navigate('/admin/panel');
            } else {
                navigate('/'); // Redirect to user dashboard or home
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
            />
            <button type="submit">Verify OTP</button>
        </form>
    );
};

export default OTPVerification;
