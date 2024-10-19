import React, { useEffect, useState } from "react";
import { getUserKlasses } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import styles from '../HomePageStyles.module.css'
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
        <div className={styles.home}>
            <h2>Classes</h2>
            {classes.length === 0 ? (
                <p>No classes available.</p> // Message when no classes exist
            ) : (
                <div className={styles.list}>
                    {classes.map((klass: any) => (
                        <a key={klass.id} onClick={() => handleClassClick(klass.id)}>
                            {klass.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClassList;
