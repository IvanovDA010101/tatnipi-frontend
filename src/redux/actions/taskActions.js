import {
    CLEAR_SUBMIT_RESULT,
    FETCH_TASK_OPTIONS_1_REQUEST,
    FETCH_TASK_OPTIONS_2_REQUEST,
    FETCH_TASK_OPTIONS_3_REQUEST,
    SUBMIT_TASK_DATA_FAILURE,
    SUBMIT_TASK_DATA_REQUEST,
    SUBMIT_TASK_DATA_SUCCESS
} from "../constants.js";

export const fetchTaskOptions1Request = () => ({type: FETCH_TASK_OPTIONS_1_REQUEST});
export const fetchTaskOptions2Request = (selectedTask) => ({
    type: FETCH_TASK_OPTIONS_2_REQUEST,
    payload: {taskId: selectedTask}
});
export const fetchTaskOptions3Request = (selectedTask, templateId) => ({
    type: FETCH_TASK_OPTIONS_3_REQUEST,
    payload: {taskId: selectedTask, templateId: templateId}
});

export const submitTaskDataRequest = (taskData) => ({
    type: SUBMIT_TASK_DATA_REQUEST,
    payload: taskData
});

export const submitTaskDataSuccess = (response) => ({
    type: SUBMIT_TASK_DATA_SUCCESS,
    payload: response
});

export const submitTaskDataFailure = (error) => ({
    type: SUBMIT_TASK_DATA_FAILURE,
    payload: error
});

export const clearSubmitResult = () => ({
    type: CLEAR_SUBMIT_RESULT
});