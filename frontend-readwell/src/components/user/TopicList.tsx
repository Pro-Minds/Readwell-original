import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserTopicsBySubjectId } from "../../services/userService"; // Import user service

const TopicList: React.FC = () => {
    const { subjectId } = useParams<{ subjectId: string }>();
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopics = async () => {
            const data = await getUserTopicsBySubjectId(Number(subjectId)); // Fetch topics by subjectId
            setTopics(data);
        };
        fetchTopics();
    }, [subjectId]);

    const handleTopicClick = (topicId: number) => {
        navigate(`/questions/${topicId}`); // Navigate to questions of the selected topic
    };

    return (
        <div>
            <h1>Topics</h1>
            {topics.length === 0 ? (
                <p>No topics available for this subject.</p>
            ) : (
                <ul>
                    {topics.map((topic: any) => (
                        <li key={topic.id} onClick={() => handleTopicClick(topic.id)}>
                            {topic.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TopicList;
