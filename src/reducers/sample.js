import { SAMPLE, CLEAR_SAMPLE } from "../actions";

const sampleReducer = (state= null, action) => {
    switch (action.type) {
        case SAMPLE:
            return state= action.payload;
        case CLEAR_SAMPLE:
            return state= null;
        default:
            return state;
    }
}

export default sampleReducer;