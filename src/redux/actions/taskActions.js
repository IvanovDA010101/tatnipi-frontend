import {
    FETCH_TASK_OPTIONS_1_REQUEST,
    FETCH_TASK_OPTIONS_2_REQUEST,
    FETCH_TASK_OPTIONS_3_REQUEST
} from "../constants.js";

export const fetchTaskOptions1Request = () => ({ type: FETCH_TASK_OPTIONS_1_REQUEST });
export const fetchTaskOptions2Request = (selectedTask) => ({ type: FETCH_TASK_OPTIONS_2_REQUEST, payload: {taskId: selectedTask} });
export const fetchTaskOptions3Request = (selectedTask, templateId) => ({ type: FETCH_TASK_OPTIONS_3_REQUEST, payload: {taskId: selectedTask, templateId : templateId} });