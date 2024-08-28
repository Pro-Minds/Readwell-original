import React, { useEffect, useState } from 'react';
import { fetchData } from "../services/apiService";

const HelloComponent = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const data = await fetchData();
                setMessage(data.join(', ')); // Join the messages into a single string if it's an array
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getMessage();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching message: {error.message}</div>;
    }

    return (
        <div>
            <h1>{message}</h1>
            <p>This is the Hello component displaying a message from the database.</p>
        </div>
    );
};

export default HelloComponent;
