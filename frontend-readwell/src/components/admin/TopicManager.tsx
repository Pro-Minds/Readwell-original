import React, { useEffect, useState } from 'react';
import { createTopic, getTopics, updateTopic, deleteTopic } from '../../services/adminService';
import { getSubjects } from '../../services/adminService';

const TopicManager = () => {
    const [topics, setTopics] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [newTopic, setNewTopic] = useState({ name: '', subject: { id: 0 } });
    const [editingTopic, setEditingTopic] = useState<{ id?: number; name?: string; subject?: number }>({});

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        const fetchSubjects = async () => {
            try {
                const data = await getSubjects();
                setSubjects(data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchTopics();
        fetchSubjects();
    }, []);

    const handleCreate = async () => {
        if (newTopic.subject.id === 0) {
            alert('Please select a subject.');
            return;
        }

        try {
            const data = await createTopic(newTopic);
            setTopics([...topics, data]);
            setNewTopic({ name: '', subject: { id: 0 } });
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    };

    const handleUpdate = async () => {
        if (!editingTopic.id) return;
        try {
            const data = await updateTopic(editingTopic.id, {
                name: editingTopic.name,
                subject: { id: editingTopic.subject || 0 }
            });
            setTopics(topics.map(topic => topic.id === data.id ? data : topic));
            setEditingTopic({});
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTopic(id);
            setTopics(topics.filter(topic => topic.id !== id));
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    };

    return (
        <div>
            <h2>Manage Topics</h2>
            {/* Form for creating topic */}
            <input
                type="text"
                value={newTopic.name}
                onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                placeholder="Topic Name"
            />
            <select
                onChange={(e) => setNewTopic({ ...newTopic, subject: { id: parseInt(e.target.value) } })}
                value={newTopic.subject.id}
            >
                <option value={0}>Select Subject</option>
                {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
            </select>
            <button onClick={handleCreate}>Create Topic</button>

            {/* Form for updating topic */}
            {editingTopic.id && (
                <div>
                    <input
                        type="text"
                        value={editingTopic.name || ''}
                        onChange={(e) => setEditingTopic({ ...editingTopic, name: e.target.value })}
                        placeholder="Update Topic Name"
                    />
                    <select
                        onChange={(e) => setEditingTopic({ ...editingTopic, subject: parseInt(e.target.value) })}
                        value={editingTopic.subject}
                    >
                        <option value={0}>Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                    <button onClick={handleUpdate}>Update Topic</button>
                </div>
            )}

            <h3>Existing Topics:</h3>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        {topic.name}
                        <button onClick={() => setEditingTopic({ id: topic.id, name: topic.name, subject: topic.subject.id })}>Edit</button>
                        <button onClick={() => handleDelete(topic.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopicManager;
