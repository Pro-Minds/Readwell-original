import React from 'react';
import { Question } from '../../services/types';

interface ReviewQuestionsProps {
    questions: Question[];
    selectedAnswers: Record<number, string[]>;
    flaggedQuestions: Set<number>; // Added to track flagged questions
    onNavigateToQuestion: (index: number) => void;
    onFinalSubmit: () => Promise<void>;
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ questions, selectedAnswers, flaggedQuestions, onNavigateToQuestion, onFinalSubmit }) => {
    return (
        <div>
            <h1>Review Your Answers</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={question.id}>
                        <label
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => onNavigateToQuestion(index)}
                        >
                            {flaggedQuestions.has(question.id) && <span style={{ color: 'red' }}>⚠️ </span>}
                            {question.questionText}
                        </label>
                        <input
                            type="checkbox"
                            checked={selectedAnswers[question.id]?.length > 0}
                            readOnly
                            style={{ marginLeft: '10px' }}
                        />
                    </li>
                ))}
            </ul>
            <button onClick={onFinalSubmit}>Submit</button>
        </div>
    );
};

export default ReviewQuestions;
