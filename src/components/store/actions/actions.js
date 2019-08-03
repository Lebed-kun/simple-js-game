import axios from 'axios';

import { BASE_URL } from '../../constants.js';
import * as actionTypes from './actionTypes.js';

export const correctAnswer = () => {
    return {
        type : actionTypes.CORRECT_ANSWER
    }
}

export const wrongAnswer = correctAnswerId => {
    return {
        type : actionTypes.WRONG_ANSWER,
        correctAnswerId
    }
}

export const errorChecking = () => {
    return {
        type : actionTypes.ERROR_CHECKING
    }
}

export const checkAnswer = id => {
    return dispatch => {
        axios.get(`${BASE_URL}/api/check_answer/${id}/`)
            .then(res => {
                if (res.data.correct_answer_id === undefined) {
                    dispatch(correctAnswer());
                } else {
                    dispatch(wrongAnswer(res.data.correct_answer_id));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(errorChecking());
            })
    }
}