import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_TASK_OPTIONS_1_REQUEST,
    FETCH_TASK_OPTIONS_1_SUCCESS,
    FETCH_TASK_OPTIONS_1_FAILURE,
    FETCH_TASK_OPTIONS_2_REQUEST,
    FETCH_TASK_OPTIONS_2_SUCCESS,
    FETCH_TASK_OPTIONS_2_FAILURE,
    FETCH_TASK_OPTIONS_3_REQUEST,
    FETCH_TASK_OPTIONS_3_SUCCESS,
    FETCH_TASK_OPTIONS_3_FAILURE,
    SUBMIT_TASK_DATA_REQUEST,
} from '../constants.js';
import {
    submitTaskDataFailure,
    submitTaskDataSuccess
} from "../actions/taskActions.js";
import { taskAPI } from "../../api/taskApi.js";

function* fetchTaskOptions1() {
    try {
        const data = yield call(taskAPI.fetchTaskOptions1);
        yield put({ type: FETCH_TASK_OPTIONS_1_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: FETCH_TASK_OPTIONS_1_FAILURE, payload: error.message });
    }
}

function* fetchTaskOptions2(action) {
    try {
        const { taskId } = action.payload;
        const data = yield call(taskAPI.fetchTaskOptions2, taskId);
        yield put({ type: FETCH_TASK_OPTIONS_2_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: FETCH_TASK_OPTIONS_2_FAILURE, payload: error.message });
    }
}

function* fetchTaskOptions3(action) {
    try {
        const { taskId, templateId } = action.payload;
        const data = yield call(taskAPI.fetchTaskOptions3, taskId, templateId);
        yield put({ type: FETCH_TASK_OPTIONS_3_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: FETCH_TASK_OPTIONS_3_FAILURE, payload: error.message });
    }
}

function* submitTaskDataSaga(action) {
    try {
        const response = yield call(taskAPI.submitTaskData, action.payload);
        yield put(submitTaskDataSuccess(response));
        console.log('Данные успешно отправлены:', response);
    } catch (error) {
        yield put(submitTaskDataFailure(error.message));
        console.error('Ошибка при отправке данных:', error);
    }
}

export function* taskSaga() {
    yield takeLatest(FETCH_TASK_OPTIONS_1_REQUEST, fetchTaskOptions1);
    yield takeLatest(FETCH_TASK_OPTIONS_2_REQUEST, fetchTaskOptions2);
    yield takeLatest(FETCH_TASK_OPTIONS_3_REQUEST, fetchTaskOptions3);
    yield takeLatest(SUBMIT_TASK_DATA_REQUEST, submitTaskDataSaga);
}