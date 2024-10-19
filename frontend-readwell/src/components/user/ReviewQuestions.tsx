import React from 'react';
import { Question } from '../../services/types';
import style from '../HomePageStyles.module.css';

interface ReviewQuestionsProps {
    questions: Question[];
    selectedAnswers: Record<number, string[]>;
    flaggedQuestions: Set<number>; // Added to track flagged questions
    onNavigateToQuestion: (index: number) => void;
    onFinalSubmit: () => Promise<void>;
}

const ReviewQuestions: React.FC<ReviewQuestionsProps> = ({ questions, selectedAnswers, flaggedQuestions, onNavigateToQuestion, onFinalSubmit }) => {
    return (
        <div className={style.home}>
            <h2>Review Your Answers</h2>
            <div>
                {questions.map((question, index) => (
                    <div className={style.reviewBlock} key={question.id}>
                        <div className={style.label}>
                            <label
                                style={{cursor: 'pointer'}}
                                onClick={() => onNavigateToQuestion(index)}
                            >
                                <div>
                                    {flaggedQuestions.has(question.id) && <span style={{color: 'red'}}>⚠️ </span>}
                                </div>
                                <div>{question.questionText}</div>
                            </label>
                        </div>
                        <div className={style.reinput}>
                            <input
                                type="checkbox"
                                checked={selectedAnswers[question.id]?.length > 0}
                                readOnly
                                style={{marginLeft: '10px'}}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.reviewBlockSubmitBtn}>
                <button onClick={onFinalSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ReviewQuestions;
