import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import {
    loginSuccess,
    loginFailure,
    refreshTokenSuccess,
    refreshTokenFailure,
} from '../actions/authActions';
import api from '../../api/api.js';
import {LOGIN_REQUEST, REFRESH_TOKEN_REQUEST} from "../constants.js";

function* handleLogin(action) {
    try {
        const response = yield call(api.login, action.payload);
        console.log(response)
        const access_token = response.access_token;
        const refresh_token = response.refresh_token;
        yield put(loginSuccess({ access_token, refresh_token }));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

function* handleRefreshToken() {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = yield call(api.refreshToken, { refresh_token: refreshToken });
        const { access_token, refresh_token } = response.data;
        yield put(refreshTokenSuccess({ access_token, refresh_token }));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    } catch (error) {
        yield put(refreshTokenFailure(error.message));
        // Если обновить токен не удалось, можно выполнить выход пользователя
        // yield put(logout());
    }
}

export function* authSaga() {
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeEvery(REFRESH_TOKEN_REQUEST, handleRefreshToken);
}
