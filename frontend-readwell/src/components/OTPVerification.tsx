import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserRole, verifyOtp } from '../services/apiService';
import { getCookie } from '../security/AuthService'; // Import cookie utility

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
            console.log('Submitting OTP:', otp);
            await verifyOtp({ email, otp });

            const token = getCookie('token');
            if (token) {
                console.log('Token found:', token);
                const role = await getUserRole(token); // Ensure token is defined
                if (role === 'ADMIN') {
                    navigate('/admin/panel'); // Redirect to admin panel
                } else {
                    navigate('/'); // Redirect to user dashboard or home
                }
            } else {
                console.error('Token not found');
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
