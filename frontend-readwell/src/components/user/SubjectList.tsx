import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserSubjectsByKlassId } from "../../services/userService";
import styles from '../HomePageStyles.module.css';

const SubjectList: React.FC = () => {
    const { klassId } = useParams<{ klassId: string }>();
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubjects = async () => {
            const data = await getUserSubjectsByKlassId(Number(klassId)); // Fetch subjects by klassId
            setSubjects(data);
        };
        fetchSubjects();
    }, [klassId]);

    const handleSubjectClick = (subjectId: number) => {
        navigate(`/topics/${subjectId}`); // Navigate to topics of the selected subject
    };

    return (
        <div className={styles.home}>
            <h2>Subjects</h2>
            {subjects.length === 0 ? (
                <p>No subjects available for this class.</p>
            ) : (
                <div className={styles.list}>
                    {subjects.map((subject: any) => (
                        <a key={subject.id} onClick={() => handleSubjectClick(subject.id)}>
                            {subject.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubjectList;
