import axios from 'axios';

const API_URL = 'http://10.49.63.86:8080/api/user';

const userApiClient = axios.create({
    baseURL: API_URL,
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
