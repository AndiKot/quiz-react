import {
    CREATE_QUIZ_QUESTION,
    RESET_CREATE_FORM
} from "../actions/actionTypes";

const initialState = {
    quiz: [],
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.question],
            };
        case RESET_CREATE_FORM:
            return {
                ...state,
                quiz: [],
            };
        default:
            return state;
    }
}
