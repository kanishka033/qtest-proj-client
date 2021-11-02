import { FETCH_QUESTIONS, CREATE, UPDATE, DELETE, LOGOUT } from '../actions/index.js';

const questionsReducer = (questions= [], action) =>{
    switch (action.type) {
        case DELETE:
            return questions.filter((q)=> q._id !== action.payload )
        case UPDATE:
            return questions.map((q)=> q._id === action.payload._id ? action.payload : questions) 
        case FETCH_QUESTIONS:
            return  action.payload;
        case CREATE:
            return [...questions, action.payload]; 
        case LOGOUT:
            return questions=[];
        default:
            return questions;
    }
}
export default questionsReducer;