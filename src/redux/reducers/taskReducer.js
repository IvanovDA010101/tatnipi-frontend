import {
    CLEAR_SUBMIT_RESULT,
    FETCH_TASK_OPTIONS_1_FAILURE,
    FETCH_TASK_OPTIONS_1_SUCCESS,
    FETCH_TASK_OPTIONS_2_FAILURE,
    FETCH_TASK_OPTIONS_2_SUCCESS,
    FETCH_TASK_OPTIONS_3_FAILURE,
    FETCH_TASK_OPTIONS_3_SUCCESS,
    SUBMIT_TASK_DATA_FAILURE,
    SUBMIT_TASK_DATA_REQUEST,
    SUBMIT_TASK_DATA_SUCCESS,
} from '../constants.js';

const initialState = {
    taskOptions1: [],
    taskOptions2: [],
    taskOptions3: [],
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASK_OPTIONS_1_SUCCESS:
            return {...state, taskOptions1: action.payload, error: null};
        case FETCH_TASK_OPTIONS_1_FAILURE:
            return {...state, error: action.payload};
        case FETCH_TASK_OPTIONS_2_SUCCESS:
            return {...state, taskOptions2: action.payload, error: null};
        case FETCH_TASK_OPTIONS_2_FAILURE:
            return {...state, error: action.payload};
        case FETCH_TASK_OPTIONS_3_SUCCESS:
            return {...state, taskOptions3: action.payload, error: null};
        case FETCH_TASK_OPTIONS_3_FAILURE:
            return {...state, error: action.payload};
        case SUBMIT_TASK_DATA_REQUEST:
            return {...state, isSubmitting: true, submitError: null, submitSuccess: false, submitResult: null};
        case SUBMIT_TASK_DATA_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                submitSuccess: true,
                submitError: null,
                submitResult: action.payload
            };
        case SUBMIT_TASK_DATA_FAILURE:
            return {
                ...state,
                isSubmitting: false,
                submitError: action.payload,
                submitSuccess: false,
                submitResult: null
            };
        case CLEAR_SUBMIT_RESULT:
            return {...state, submitSuccess: false, submitError: null, submitResult: null};
        default:
            return state;
    }
};

export default taskReducer;