export interface User {
    email: string;
    isAdmin: boolean;
}

export interface Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswers: string[]; // Changed to an array to accommodate multiple correct answers
}

export interface Answer {
    id: number;
    question: Question;
    selectedOption: string[]; // Changed to an array for multiple selected options
    isCorrect: boolean;
}
