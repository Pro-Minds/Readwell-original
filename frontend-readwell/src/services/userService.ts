import axios from 'axios';

const USER_API_URL = process.env.REACT_APP_USER_API_URL;

const userApiClient = axios.create({
    baseURL: USER_API_URL,
    withCredentials: true,
});

// Fetch subjects by class ID
export const getUserSubjectsByKlassId = async (klassId: number): Promise<any> => {
    const response = await userApiClient.get(`/subjects/${klassId}`);
    return response.data;
};

// Fetch topics by subject ID
export const getUserTopicsBySubjectId = async (subjectId: number): Promise<any> => {
    const response = await userApiClient.get(`/topics/${subjectId}`);
    return response.data;
};

// Fetch questions by topic ID
export const getUserQuestionsByTopicId = async (topicId: number): Promise<any> => {
    const response = await userApiClient.get(`/questions/${topicId}`);
    return response.data;
};

// Fetch all classes
export const getUserKlasses = async (): Promise<any> => {
    const response = await userApiClient.get('/klasses');
    return response.data;
};

// Fetch all subjects
export const getUserSubjects = async (): Promise<any> => {
    const response = await userApiClient.get('/subjects');
    return response.data;
};

// Fetch all topics
export const getUserTopics = async (): Promise<any> => {
    const response = await userApiClient.get('/topics');
    return response.data;
};

// Fetch all questions
export const getUserQuestions = async (): Promise<any> => {
    const response = await userApiClient.get('/questions');
    return response.data;
};

// Submit an answer
export const submitAnswer = async (answer: any): Promise<any> => {
    const response = await userApiClient.post('/answers', answer);
    return response.data;
};

export default userApiClient;
