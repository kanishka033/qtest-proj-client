import axios from 'axios';

const url = 'http://localhost:5000/questions';

export const fetchQuestions = () => axios.get(url);
export const createQuestions = (question) => axios.post(url, question);
export const updateQuestions = (id, question) => axios.patch(`${url}/${id}`,question);
export const deleteQuestions = (id) => axios.delete(`${url}/${id}`);