import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserQuestionsByTopicId } from "../../services/userService";
import { Question } from "../../services/types";
import ReviewQuestions from './ReviewQuestions'; // Import the Review component
import QuizResults from "./QuizResults";

const QuestionList: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showReview, setShowReview] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await getUserQuestionsByTopicId(Number(topicId));
            setQuestions(data);
        };
        fetchQuestions();
    }, [topicId]);

    const handleAnswerChange = (questionId: number, selectedOption: string) => {
        setSelectedAnswers((prev) => {
            const currentAnswers = prev[questionId] || [];
            if (currentAnswers.includes(selectedOption)) {
                return { ...prev, [questionId]: currentAnswers.filter(answer => answer !== selectedOption) };
            } else {
                return { ...prev, [questionId]: [...currentAnswers, selectedOption] };
            }
        });
    };

    const handleSubmit = async () => {
        // Handle submission logic here
        setShowResults(true); // Show results after submission
    };

    const handleFinalSubmit = async () => {
        await handleSubmit();
        // Redirect or show success message after submission
    };

    const navigateToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
        setShowReview(false); // Go back to question view
    };


    const toggleFlagQuestion = (questionId: number) => {
        setFlaggedQuestions((prev) => {
            const newFlags = new Set(prev);
            if (newFlags.has(questionId)) {
                newFlags.delete(questionId);
            } else {
                newFlags.add(questionId);
            }
            return newFlags;
        });
    };

    return (
        <div>
            {questions.length === 0 ? (
                <h1>There are no questions for this topic at the moment.</h1>
            ) : showResults ? (
                <QuizResults
                    questions={questions}
                    selectedAnswers={selectedAnswers}
                />
            ) : !showReview ? (
                <>
                    <h1>Question {currentQuestionIndex + 1} of {questions.length}</h1>
                    {questions[currentQuestionIndex] ? (
                        <div>
                            <p>{questions[currentQuestionIndex].questionText}</p>
                            <ul>
                                {questions[currentQuestionIndex].options.map((option) => (
                                    <li key={option}>
                                        <input
                                            type={questions[currentQuestionIndex].correctAnswers.length > 1 ? "checkbox" : "radio"}
                                            name={`question-${questions[currentQuestionIndex].id}`}
                                            value={option}
                                            onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                                            checked={selectedAnswers[questions[currentQuestionIndex].id]?.includes(option) || false}
                                        />
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => toggleFlagQuestion(questions[currentQuestionIndex].id)}>
                                {flaggedQuestions.has(questions[currentQuestionIndex].id) ? "Unflag" : "Flag"} as Difficult
                            </button>
                            <button onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))} disabled={currentQuestionIndex === 0}>Prev</button>
                            <button onClick={() => {
                                if (currentQuestionIndex < questions.length - 1) {
                                    setCurrentQuestionIndex(prev => prev + 1);
                                } else {
                                    handleFinalSubmit();
                                }
                            }}>
                                {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                            </button>
                        </div>
                    ) : null}
                </>
            ) : (
                <ReviewQuestions
                    questions={questions}
                    selectedAnswers={selectedAnswers}
                    onNavigateToQuestion={navigateToQuestion}
                    onFinalSubmit={handleFinalSubmit}
                />
            )}
        </div>
    );
};

export default QuestionList;
