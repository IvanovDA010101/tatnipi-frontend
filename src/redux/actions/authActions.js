import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST, REGISTER_SUCCESS,
} from "../constants.js";

export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token,
});

export const loginFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

export const registerRequest = (credentials) => ({
    type: REGISTER_REQUEST,
    payload: credentials,
});

export const registerSuccess = (token) => ({
    type: REGISTER_SUCCESS,
    payload: token,
});

export const registerFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});


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