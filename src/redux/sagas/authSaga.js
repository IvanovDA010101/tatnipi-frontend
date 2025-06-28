import { takeLatest, call, put } from 'redux-saga/effects';
import {
    loginSuccess,
    loginFailure,
    registerSuccess,
    registerFailure,
    refreshTokenSuccess,
    refreshTokenFailure,
    checkAuthSuccess,
    checkAuthFailure,
    logoutSuccess,
} from '../actions/authActions';
import api from '../../api/api.js';
import {
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    REFRESH_TOKEN_REQUEST,
    CHECK_AUTH_REQUEST,
    LOGOUT_REQUEST,
} from "../constants.js";

function* handleLogin(action) {
    try {
        console.log('Login saga started with payload:', action.payload);
        const response = yield call(api.login, action.payload);
        console.log('Login response:', response);

        const { access_token, refresh_token, user } = response;

        // Save tokens to localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        yield put(loginSuccess({
            access_token,
            refresh_token,
            user: user || { login: action.payload.login }
        }));

        console.log('Login successful');
    } catch (error) {
        console.error('Login error:', error);
        yield put(loginFailure(error.message || 'Ошибка входа'));
    }
}

function* handleRegister(action) {
    try {
        console.log('Register saga started with payload:', action.payload);
        const response = yield call(api.register, action.payload);
        console.log('Register response:', response);

        const { access_token, refresh_token, user } = response;

        // Save tokens to localStorage
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        yield put(registerSuccess({
            access_token,
            refresh_token,
            user: user || { login: action.payload.login }
        }));

        console.log('Registration successful');
    } catch (error) {
        console.error('Register error:', error);
        yield put(registerFailure(error.message || 'Ошибка регистрации'));
    }
}

function* handleRefreshToken() {
    try {
        console.log('Refresh token saga started');
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        // Прямой вызов без использования api.refreshToken чтобы избежать циклов
        const response = yield call(fetch, `${import.meta.env.VITE_BACKEND_HOST}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            const errorData = yield call([response, 'json']);
            throw new Error(errorData.message || 'Failed to refresh token');
        }

        const { access_token, refresh_token: new_refresh_token } = yield call([response, 'json']);

        // Update tokens in localStorage
        localStorage.setItem('access_token', access_token);
        if (new_refresh_token) {
            localStorage.setItem('refresh_token', new_refresh_token);
        }

        yield put(refreshTokenSuccess({
            access_token,
            refresh_token: new_refresh_token || refreshToken
        }));

        console.log('Token refresh successful');
    } catch (error) {
        console.error('Refresh token error:', error);

        // Clear invalid tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        yield put(refreshTokenFailure(error.message || 'Ошибка обновления токена'));
    }
}

function* handleCheckAuth() {
    try {
        console.log('Check auth saga started');

        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        if (!accessToken || !refreshToken) {
            console.log('No tokens found, user not authenticated');
            yield put(checkAuthFailure('No tokens found'));
            return;
        }

        // Try to get user info with current token
        try {
            const userResponse = yield call(api.getCurrentUser);
            yield put(checkAuthSuccess(userResponse.user || { login: 'User' }));
            console.log('Auth check successful');
        } catch (tokenError) {
            console.log('Access token invalid, trying to refresh...');

            // Try refresh token once
            try {
                yield call(handleRefreshToken);
                // After successful refresh, try to get user again
                const userResponse = yield call(api.getCurrentUser);
                yield put(checkAuthSuccess(userResponse.user || { login: 'User' }));
                console.log('Auth check successful after token refresh');
            } catch (refreshError) {
                console.error('Token refresh failed during auth check:', refreshError);
                // Clear tokens and fail auth check
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                yield put(checkAuthFailure('Authentication failed'));
            }
        }

    } catch (error) {
        console.error('Check auth error:', error);

        // Clear invalid tokens
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        yield put(checkAuthFailure(error.message || 'Ошибка проверки аутентификации'));
    }
}

function* handleLogout() {
    try {
        console.log('Logout saga started');

        // Clear tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Optional: call logout endpoint
        try {
            yield call(api.logout);
        } catch (logoutError) {
            // Ignore logout API errors
            console.warn('Logout API error (ignored):', logoutError);
        }

        yield put(logoutSuccess());
        console.log('Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
        // Even if logout fails, clear local state
        yield put(logoutSuccess());
    }
}

export function* authSaga() {
    console.log('Auth saga initialized');
    yield takeLatest(LOGIN_REQUEST, handleLogin);
    yield takeLatest(REGISTER_REQUEST, handleRegister);
    yield takeLatest(REFRESH_TOKEN_REQUEST, handleRefreshToken);
    yield takeLatest(CHECK_AUTH_REQUEST, handleCheckAuth);
    yield takeLatest(LOGOUT_REQUEST, handleLogout);
    console.log('Auth saga watchers set up');
}