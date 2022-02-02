import {
    CREATE_QUIZ_QUESTION,
    RESET_CREATE_FORM
} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(question) {
    return {
        type: CREATE_QUIZ_QUESTION,
        question,
    };
}

export function createQuizFinish() {
    return async (dispatch, getState) => {
        await axios.post('quizes.json', getState().create.quiz);
        dispatch(resetCreateForm())
    }
}

export function resetCreateForm() {
    return {
        type: RESET_CREATE_FORM,
    }
}
