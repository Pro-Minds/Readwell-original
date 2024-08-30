import React, { useEffect, useState } from "react";
import { getUserKlasses } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const ClassList: React.FC = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            const data = await getUserKlasses(); // Fetch classes from user API
            setClasses(data);
        };
        fetchClasses();
    }, []);

    const handleClassClick = (klassId: number) => {
        navigate(`/subjects/${klassId}`); // Navigate to subjects of the selected class
    };

    return (
        <div>
            <h1>Classes</h1>
            {classes.length === 0 ? (
                <p>No classes available.</p> // Message when no classes exist
            ) : (
                <ul>
                    {classes.map((klass: any) => (
                        <li key={klass.id} onClick={() => handleClassClick(klass.id)}>
                            {klass.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ClassList;
