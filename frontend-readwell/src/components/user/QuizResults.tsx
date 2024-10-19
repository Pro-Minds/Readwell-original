import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../services/types';
import styles from '../HomePageStyles.module.css';

interface QuizResultsProps {
    questions: Question[];
    selectedAnswers: Record<number, string[]>;
}

const QuizResults: React.FC<QuizResultsProps> = ({ questions, selectedAnswers }) => {
    const navigate = useNavigate();

    const results = questions.map((question) => {
        const userAnswers = selectedAnswers[question.id] || [];
        const allCorrectAnswers = question.correctAnswers.length > 0;
        const hasSelectedAnswers = userAnswers.length > 0;

        // Check if all correct answers are selected and no incorrect answers are chosen
        const isCorrect = hasSelectedAnswers &&
            allCorrectAnswers &&
            userAnswers.length === question.correctAnswers.length &&
            userAnswers.every(answer => question.correctAnswers.includes(answer));

        return {
            questionText: question.questionText,
            userAnswers,
            correctAnswers: question.correctAnswers,
            isCorrect
        };
    });

    return (
        <div className={styles.home}>
            <h2>Quiz Results</h2>
            <div>
                {results.map((result, index) => (
                    <div key={index}>
                        <p><strong>Question:</strong> {result.questionText}</p>
                        <p><strong>Your Answers:</strong> {result.userAnswers.length > 0 ? result.userAnswers.join(', ') : 'None'}</p>
                        <p><strong>Correct Answers:</strong> {result.correctAnswers.join(', ')}</p>
                        <p><strong>Status:</strong> {result.isCorrect ? 'Correct' : 'Incorrect'}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default QuizResults;
