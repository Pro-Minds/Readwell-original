import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserTopicsBySubjectId } from "../../services/userService"; // Import user service
import styles from '../HomePageStyles.module.css';

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
        <div className={styles.home}>
            <h2>Topics</h2>
            {topics.length === 0 ? (
                <p>No topics available for this subject.</p>
            ) : (
                <div className={styles.list}>
                    {topics.map((topic: any) => (
                        <a key={topic.id} onClick={() => handleTopicClick(topic.id)}>
                            {topic.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopicList;
