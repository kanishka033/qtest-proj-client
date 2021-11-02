import * as api from '../api';
import { GET_QUESTION } from './index';

// minus the response array -> implement
export const getQuest = (url) => async (dispatch) => {
    try {
        const { data } = await api.fetchQuest(url);
        dispatch({ type: GET_QUESTION,  payload:data })
    } 
    catch(error) {
        console.log(error)
    }
}

export const addResponse = (url, body) => async (dispatch) => {
    try {
        await api.anonymousResponse(url, body);
    } catch (error) {
        console.log(error)
    }
}

export const emailResponse =(url, body) => async (dispatch) => {
    try {
        await api.emailResponse(url, body);
    } catch (error) {
        console.log(error)
    }
}

export const oneTimeResponse = (url, body) => async (dispatch) => {
    try {
        await api.onetimeResponse(url, body);
    } catch (error) {
        console.log(error)
    }
}

export const deleteresponse = (id,resId) => async (dispatch) => {
    try {
        await api.deleteResponse(id,resId);
    } catch (error) {
        console.log(error)
    }
}
