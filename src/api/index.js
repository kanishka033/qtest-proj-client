import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const signIn = (FormData) => API.post('/users/signin', FormData);
export const signUp = (FormData) => API.post('/users/signup', FormData);

export const fetchQuestions = (email) => API.get(`/questions/${email}`);
export const createQuestions = (question) => API.post('/questions', question);
export const updateQuestions = (id, question) => API.patch(`/questions/${id}`,question);
export const deleteQuestions = (id) => API.delete(`/questions/${id}`);

export const fetchQuest = (url) => API.get(`/response/${url}`);
export const anonymousResponse = (url, data) => API.patch(`/response/${url}`, data);
export const emailResponse = (url, data) => API.patch(`/response/email/${url}`, data);
export const onetimeResponse = (url, data) => API.patch(`/response/onetime/${url}`, data);
export const deleteResponse = (id, resId) => API.patch(`/response/delete/${id}/${resId}`);

// `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
export const getsample =(url) => axios.get(url); 
