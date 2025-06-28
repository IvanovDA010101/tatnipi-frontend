import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    CHECK_AUTH_REQUEST,
    CHECK_AUTH_SUCCESS,
    CHECK_AUTH_FAILURE,
} from "../constants.js";

// Login Actions
export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// Register Actions
export const registerRequest = (credentials) => ({
    type: REGISTER_REQUEST,
    payload: credentials,
});

export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data,
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

// Refresh Token Actions
export const refreshTokenRequest = () => ({
    type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = (tokens) => ({
    type: REFRESH_TOKEN_SUCCESS,
    payload: tokens,
});

export const refreshTokenFailure = (error) => ({
    type: REFRESH_TOKEN_FAILURE,
    payload: error,
});

// Logout Actions
export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

// Check Auth Actions
export const checkAuthRequest = () => ({
    type: CHECK_AUTH_REQUEST,
});

export const checkAuthSuccess = (user) => ({
    type: CHECK_AUTH_SUCCESS,
    payload: user,
});

export const checkAuthFailure = (error) => ({
    type: CHECK_AUTH_FAILURE,
    payload: error,
});