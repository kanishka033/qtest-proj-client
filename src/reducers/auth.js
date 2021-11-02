import { AUTH, LOGOUT, ERROR, CLEAR_ERROR, MODAL } from '../actions/index';

const authReducer = (state= { login: false, authData: null, error: null, modal: false }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action.data) 
            localStorage.setItem('profile', JSON.stringify({...action?.data}));   
            return { ...state, authData: action?.data, login: action?.login };
        case LOGOUT: 
            localStorage.clear();
            return { ...state, login: false, authData: null };
        case ERROR:
            return { ...state, authData: action?.data, error: action.message };
        case CLEAR_ERROR:
            return { ...state, error: null };
        case MODAL:
            return {...state, modal: action.payload }
        default:
            return state;   
    }
}

export default authReducer;