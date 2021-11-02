import { GET_QUESTION } from "../actions";

const questionsReducer = (questions= [], action) =>{
    switch (action.type) {
        case GET_QUESTION:
            return action.payload;
        default:
            return questions;
    }
}

export default questionsReducer;