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
} from '../constants.js';
import store from "../store.js";

const BASE_URL = import.meta.env.VITE_BACKEND_HOST;

const fetchWithToken = async (url) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    console.log(accessToken);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

function* fetchTaskOptions1() {
    try {
        const data = yield call(fetchWithToken, `${BASE_URL}/tasks`);
        console.log(data);
        yield put({ type: FETCH_TASK_OPTIONS_1_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: FETCH_TASK_OPTIONS_1_FAILURE, payload: error.message });
    }
}

function* fetchTaskOptions2(action) {
    try {
        const { taskId } = action.payload;
        const data = yield call(fetchWithToken, `${BASE_URL}/tasks?task_id=${taskId}`);
        yield put({ type: FETCH_TASK_OPTIONS_2_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: FETCH_TASK_OPTIONS_2_FAILURE, payload: error.message });
    }
}

function* fetchTaskOptions3(action) {
    try {
        const { taskId, templateId } = action.payload;
        const data = yield call(fetchWithToken, `${BASE_URL}/tasks?task_id=${taskId}&template_id=${templateId}`);
        yield put({ type: FETCH_TASK_OPTIONS_3_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: FETCH_TASK_OPTIONS_3_FAILURE, payload: error.message });
    }
}

export function* taskSaga() {
    yield takeLatest(FETCH_TASK_OPTIONS_1_REQUEST, fetchTaskOptions1);
    yield takeLatest(FETCH_TASK_OPTIONS_2_REQUEST, fetchTaskOptions2);
    yield takeLatest(FETCH_TASK_OPTIONS_3_REQUEST, fetchTaskOptions3);
}