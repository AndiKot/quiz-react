import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    QUIZ_SET_STATE,
    QUIZ_FINISHED, QUIZ_REPEAT,
} from '../actions/actionTypes';

const initialState = {
    quizzes: [],
    isLoading: true,
    activeQuestion: 0,
    isFinished: false,
    answerState: null,
    quiz: [],
    results: {},
    rightAnswers: 0,
};

export default function quizReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_QUIZZES_START:
            return {
                ...state,
                isLoading: true,
                isFinished: false,
                results: {},
                rightAnswers: 0,
                activeQuestion: 0,
            }
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizzes: action.quizzes,
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quiz: action.quiz,
            }
        case FETCH_QUIZZES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
                rightAnswers: action.rightAnswers
            }
        case QUIZ_FINISHED:
            return {
                ...state,
                ...action.finishedState,
            }
        case QUIZ_REPEAT:
            return {
                ...state,
                isFinished: false,
                results: {},
                rightAnswers: 0,
                activeQuestion: 0,
            }
        default:
            return state;
    }
}
