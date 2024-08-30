import React, { useEffect, useState } from 'react';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../../services/adminService';
import { getTopics } from '../../services/adminService';

const QuestionManager = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [topics, setTopics] = useState<any[]>([]);
    const [newQuestion, setNewQuestion] = useState({
        questionText: '',
        options: [''],
        correctAnswers: [''],  // Changed from correctAnswer to correctAnswers
        topic: { id: 0 }
    });
    const [editingQuestion, setEditingQuestion] = useState<{ id?: number; questionText?: string; options?: string[]; correctAnswers?: string[]; topic?: number }>({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                setTopics(data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchQuestions();
        fetchTopics();
    }, []);

    const handleCreate = async () => {
        if (newQuestion.topic.id === 0) {
            alert('Please select a topic.');
            return;
        }

        try {
            const data = await createQuestion(newQuestion);
            setQuestions([...questions, data]);
            setNewQuestion({
                questionText: '',
                options: [''],
                correctAnswers: [''],  // Reset correctAnswers
                topic: { id: 0 }
            });
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    const handleUpdate = async () => {
        if (!editingQuestion.id) return;
        try {
            const data = await updateQuestion(editingQuestion.id, {
                questionText: editingQuestion.questionText,
                options: editingQuestion.options || [],
                correctAnswers: editingQuestion.correctAnswers || [],  // Ensure correctAnswers is sent
                topic: { id: editingQuestion.topic || 0 }
            });
            setQuestions(questions.map(question => question.id === data.id ? data : question));
            setEditingQuestion({});
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteQuestion(id);
            setQuestions(questions.filter(question => question.id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <div>
            <h2>Manage Questions</h2>
            {/* Form for creating question */}
            <input
                type="text"
                value={newQuestion.questionText}
                onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                placeholder="Question Text"
            />
            <input
                type="text"
                value={newQuestion.options.join(',')}
                onChange={(e) => setNewQuestion({ ...newQuestion, options: e.target.value.split(',') })}
                placeholder="Options (comma separated)"
            />
            <input
                type="text"
                value={newQuestion.correctAnswers.join(',')}  // Update for correctAnswers
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswers: e.target.value.split(',') })}  // Update for correctAnswers
                placeholder="Correct Answers (comma separated)"
            />
            <select
                onChange={(e) => setNewQuestion({ ...newQuestion, topic: { id: parseInt(e.target.value) } })}
                value={newQuestion.topic.id}
            >
                <option value={0}>Select Topic</option>
                {topics.map(topic => (
                    <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
            </select>
            <button onClick={handleCreate}>Create Question</button>

            {/* Form for updating question */}
            {editingQuestion.id && (
                <div>
                    <input
                        type="text"
                        value={editingQuestion.questionText || ''}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, questionText: e.target.value })}
                        placeholder="Update Question Text"
                    />
                    <input
                        type="text"
                        value={editingQuestion.options?.join(',') || ''}
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, options: e.target.value.split(',') })}
                        placeholder="Update Options (comma separated)"
                    />
                    <input
                        type="text"
                        value={editingQuestion.correctAnswers?.join(',') || ''}  // Update for correctAnswers
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, correctAnswers: e.target.value.split(',') })}  // Update for correctAnswers
                        placeholder="Update Correct Answers (comma separated)"
                    />
                    <select
                        onChange={(e) => setEditingQuestion({ ...editingQuestion, topic: parseInt(e.target.value) })}
                        value={editingQuestion.topic}
                    >
                        <option value={0}>Select Topic</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>{topic.name}</option>
                        ))}
                    </select>
                    <button onClick={handleUpdate}>Update Question</button>
                </div>
            )}

            <h3>Existing Questions:</h3>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        {question.questionText}
                        <button onClick={() => setEditingQuestion({
                            id: question.id,
                            questionText: question.questionText,
                            options: question.options,
                            correctAnswers: question.correctAnswers,  // Update for correctAnswers
                            topic: question.topic.id
                        })}>Edit</button>
                        <button onClick={() => handleDelete(question.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionManager;
