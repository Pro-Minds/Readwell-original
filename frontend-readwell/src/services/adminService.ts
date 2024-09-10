import axios from 'axios';
import {logout} from "../security/AuthService";

const API_URL = 'http:readwell-server:8080/api'; // Update to match backend service name and port

const adminApiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

adminApiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

// Klass API functions
export const createKlass = async (klassData: any): Promise<any> => {
    const response = await adminApiClient.post('/admin/klasses', klassData);
    return response.data;
};

export const getKlasses = async (): Promise<any> => {
    const response = await adminApiClient.get('/admin/klasses');
    return response.data;
};

export const updateKlass = async (id: number, klassData: any): Promise<any> => {
    const response = await adminApiClient.put(`/admin/klasses/${id}`, klassData);
    return response.data;
};

export const deleteKlass = async (id: number): Promise<any> => {
    const response = await adminApiClient.delete(`/admin/klasses/${id}`);
    return response.data;
};

// Subject API functions
export const createSubject = async (subjectData: any): Promise<any> => {
    const response = await adminApiClient.post('/admin/subjects', subjectData);
    return response.data;
};

export const getSubjects = async (): Promise<any> => {
    const response = await adminApiClient.get('/admin/subjects');
    return response.data;
};

export const updateSubject = async (id: number, subjectData: any): Promise<any> => {
    const response = await adminApiClient.put(`/admin/subjects/${id}`, subjectData);
    return response.data;
};

export const deleteSubject = async (id: number): Promise<any> => {
    const response = await adminApiClient.delete(`/admin/subjects/${id}`);
    return response.data;
};

// Topic API functions
export const createTopic = async (topicData: any): Promise<any> => {
    const response = await adminApiClient.post('/admin/topics', topicData);
    return response.data;
};

export const getTopics = async (): Promise<any> => {
    const response = await adminApiClient.get('/admin/topics');
    return response.data;
};

export const updateTopic = async (id: number, topicData: any): Promise<any> => {
    const response = await adminApiClient.put(`/admin/topics/${id}`, topicData);
    return response.data;
};

export const deleteTopic = async (id: number): Promise<any> => {
    const response = await adminApiClient.delete(`/admin/topics/${id}`);
    return response.data;
};

// Question API functions
export const createQuestion = async (questionData: any): Promise<any> => {
    const response = await adminApiClient.post('/admin/questions', questionData);
    return response.data;
};

export const getQuestions = async (): Promise<any> => {
    const response = await adminApiClient.get('/admin/questions');
    return response.data;
};

export const updateQuestion = async (id: number, questionData: any): Promise<any> => {
    const response = await adminApiClient.put(`/admin/questions/${id}`, questionData);
    return response.data;
};

export const deleteQuestion = async (id: number): Promise<any> => {
    const response = await adminApiClient.delete(`/admin/questions/${id}`);
    return response.data;
};

export default adminApiClient;