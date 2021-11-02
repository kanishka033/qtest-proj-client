import { combineReducers } from "redux";
import documents from './documents';
import auth from './auth';
import sample from './sample';
import questions from './questions';

const rootReducer = combineReducers({
    documents,
    auth,
    questions,
    sample
})

export default rootReducer;