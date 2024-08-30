import React from 'react';
import { Question } from '../../services/types';

interface ReviewQuestionsProps {
    questions: Question[];
    selectedAnswers: Record<number, string[]>;
    onNavigateToQuestion: (index: number) => void;
    onFinalSubmit: () => Promise<void>;
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ questions, selectedAnswers, onNavigateToQuestion, onFinalSubmit }) => {
    return (
        <div>
            <h1>Review Your Answers</h1>
            <ul>
                {questions.map((question, index) => (
                    <li key={question.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedAnswers[question.id]?.length > 0}
                                readOnly
                            />
                            {question.questionText}
                        </label>
                        <button onClick={() => onNavigateToQuestion(index)}>Edit Answer</button>
                    </li>
                ))}
            </ul>
            <button onClick={onFinalSubmit}>Submit</button>
        </div>
    );
};

export default ReviewQuestions;
