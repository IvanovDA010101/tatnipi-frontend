import {
    FETCH_TASK_OPTIONS_1_SUCCESS,
    FETCH_TASK_OPTIONS_1_FAILURE,
    FETCH_TASK_OPTIONS_2_SUCCESS,
    FETCH_TASK_OPTIONS_2_FAILURE,
    FETCH_TASK_OPTIONS_3_SUCCESS,
    FETCH_TASK_OPTIONS_3_FAILURE,
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
            return { ...state, taskOptions1: action.payload, error: null };
        case FETCH_TASK_OPTIONS_1_FAILURE:
            return { ...state, error: action.payload };
        case FETCH_TASK_OPTIONS_2_SUCCESS:
            return { ...state, taskOptions2: action.payload, error: null };
        case FETCH_TASK_OPTIONS_2_FAILURE:
            return { ...state, error: action.payload };
        case FETCH_TASK_OPTIONS_3_SUCCESS:
            return { ...state, taskOptions3: action.payload, error: null };
        case FETCH_TASK_OPTIONS_3_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default taskReducer;