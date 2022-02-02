import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    QUIZ_SET_STATE,
    QUIZ_FINISHED,
    QUIZ_REPEAT,
} from './actionTypes';

export function fetchQuizzes() {
    return async (dispatch) => {
        dispatch(fetchQuizzesStart());

        try {
            const quizzes = [];
            const response = await axios.get('quizes.json');
            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            });

            dispatch(fetchQuizzesSuccess(quizzes));
        } catch (err) {
            dispatch(fetchQuizzesError(err));
        }
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizzesStart());

        try {
            const response = await axios.get(`quizes/${quizId}.json`)
// debugger
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                dispatch(fetchQuizSuccess(response.data));
            }, 3000);

        } catch (err) {
            dispatch(fetchQuizzesError(err));
        }
    }
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START,
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizzesError(err) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: err,
    }
}

export function quizAnswerClick(answerId) {
    function isQuizFinished(activeQuestion, length) {
        if (activeQuestion === length) {
            return true;
        }
        return false;
    }

    return (dispatch, getState) => {
        const state = getState().quiz;
        const question = state['activeQuestion'];

        if ( answerId === state.quiz[question].correctAnswerId) {
            dispatch(quizSetState(
                {[answerId]: 'success'},
                {...state.results, [state.quiz[question].id]: 'success'},
            state.rightAnswers + 1
            ));
        } else {
            dispatch(quizSetState(
                {[answerId]: 'error'},
                {...state.results, [state.quiz[question].id]: 'error'},
                state.rightAnswers
            ));
        }

        // Switch to the next question or results card
        const finishedState = isQuizFinished(state.activeQuestion, state.quiz.length - 1)
            ? {
                isFinished: true,
                answerState: null
            }
            : {
                activeQuestion: state.activeQuestion + 1,
                answerState: state.answerState
            };

        let timeout = setTimeout(() => {
            clearTimeout(timeout);
            dispatch(quizFinished(finishedState));
            },700);

    }
}

export function quizSetState(answerState, results, rightAnswers) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results,
        rightAnswers
    };
}

export function quizFinished(finishedState) {
    return {
        type: QUIZ_FINISHED,
        finishedState,
    }
}

export function quizRepeatClick() {
    return {
        type: QUIZ_REPEAT,
    }
}
