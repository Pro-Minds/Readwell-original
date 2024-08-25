import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../services/apiService';
import { AxiosError } from 'axios';

interface LocationState {
    email?: string;
}

const OTPVerification: React.FC = () => {
    const [formData, setFormData] = useState<{ email: string; otp: string }>({
        email: '',
        otp: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // No type argument

    useEffect(() => {
        const state = location.state as LocationState; // Type assertion
        if (state?.email) {
            setFormData(prevData => ({
                ...prevData,
                email: state.email || '', // Ensure email is a string
            }));
        }
    }, [location.state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await verifyOtp(formData);
            alert('OTP verified successfully!');
            navigate('/admin/panel');
        } catch (err) {
            console.error('OTP verification error:', err);
            if (err instanceof AxiosError) { // Check for AxiosError
                setError(err.response?.data || 'Invalid OTP. Please try again.');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>OTP Verification</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        readOnly={!!(location.state as LocationState)?.email}
                    />
                </div>
                <div>
                    <label>OTP:</label>
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                        maxLength={6}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default OTPVerification;
