import * as api from '../api';
import { FETCH_QUESTIONS, CREATE, UPDATE, DELETE, SAMPLE } from './index.js'

// gets all the question related to user (dashboard)
export const getQuestion = (email) => async (dispatch) => {
    try {
        const { data } = await api.fetchQuestions(email);
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

export const getSample = (url) => async (dispatch) => {
    try {
        const { data } = await api.getsample(url);
        dispatch({ type: SAMPLE, payload: data.results });
    } catch (error) {
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

