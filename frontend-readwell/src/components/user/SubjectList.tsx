import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserSubjectsByKlassId } from "../../services/userService";

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
        <div>
            <h1>Subjects</h1>
            {subjects.length === 0 ? (
                <p>No subjects available for this class.</p>
            ) : (
                <ul>
                    {subjects.map((subject: any) => (
                        <li key={subject.id} onClick={() => handleSubjectClick(subject.id)}>
                            {subject.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubjectList;
