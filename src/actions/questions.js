import * as api from '../api';
import { FETCH_QUESTIONS, CREATE, UPDATE, DELETE } from './index.js'

export const getQuestion = () => async (dispatch) => {
    try {
        const { data } = await api.fetchQuestions();
        dispatch({ type: FETCH_QUESTIONS,  payload:data })
    } 
    catch(error) {
        console.log(error)
    }
}

export const CreateQuestion = (question) => async (dispatch) => {
    try {
        const { data } = await api.createQuestions(question)
        dispatch({ type: CREATE, payload: data})
    } 
    catch (error) {
        console.log(error)
    }
}

export const updateQuestion = (id, question) => async (dispatch) => {
    try {
        const { data } = await api.updateQuestions(id, question)
        dispatch({ type: UPDATE, payload: data })
    } 
    catch (error) {
        console.log(error)
    }
}

export const deleteQuestion = (id) => async (dispatch) => {
    try {
        await api.deleteQuestions(id)
        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}
