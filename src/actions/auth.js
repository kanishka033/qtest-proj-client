import axios from 'axios';
import * as api from '../api';
import { AUTH, ERROR, MODAL } from './index.js';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data, login: true })
        // if '/auth' then push '/' else switch account modal action
        history ? history.push('/') : dispatch({ type: MODAL, payload: false});

    } catch (error) { 
        dispatch({ type: ERROR, message: error.response.data })
        console.log(error.response.data, error.response.message)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data, login: true })
        history.push('/')
    } catch (error) {
        dispatch({ type: ERROR, message: error.response.data })
        console.log(error)
    }
}
