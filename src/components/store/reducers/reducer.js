import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    continued : false,
    fail : false,
    correctAnswerId : -1,
    checkingAnswerError : false
}

const correctAnswer = (state, action) => {
    return Object.assign({}, state, { 
        continued : !state.continued,
        correctAnswerId : action.correctAnswerId
    });
}

const wrongAnswer = (state, action) => {
    return Object.assign({}, state, {
        fail : true,
        correctAnswerId : action.correctAnswerId
    })
}

const errorChecking = state => {
    return Object.assign({}, state, { checkingAnswerError : !state.checkingAnswerError });
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CORRECT_ANSWER:
            return correctAnswer(state, action);
        case actionTypes.WRONG_ANSWER:
            return wrongAnswer(state, action);
        case actionTypes.ERROR_CHECKING:
            return errorChecking(state);
        default:
            return state;
    }
}

export default reducer;