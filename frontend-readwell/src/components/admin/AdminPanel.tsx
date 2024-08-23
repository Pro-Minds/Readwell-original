import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from '../../apiService';
import { logout } from '../../security/AuthService';

const AdminPanel = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProtectedData = async () => {
            try {
                const response = await fetchProtectedData();
                setData(response);
            } catch (err) {
                console.error('Error fetching protected data:', err);
            } finally {
                setLoading(false);
            }
        };

        getProtectedData();
    }, []);

    const handleLogout = () => {
        logout();
    };

    if (loading) return <div>Loading admin data...</div>;

    return (
        <div>
            <h2>Welcome to the Admin Panel</h2>
            <button onClick={handleLogout}>Logout</button>
            {data ? (
                <div>
                    <h3>Protected Data:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default AdminPanel;
