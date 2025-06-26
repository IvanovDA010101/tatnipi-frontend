import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
} from '../constants.js';

const initialState = {
    accessToken: "EMPTY",
    refreshToken: "EMPTY",
    loading: false,
    error: "EMPTY",
    isAuthenticated : false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REFRESH_TOKEN_REQUEST:
            return { ...state, loading: true, error: null, isAuthenticated: false };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                isAuthenticated: true,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
        case REFRESH_TOKEN_FAILURE:
            return { ...state, loading: false, error: action.payload, isAuthenticated: false };
        default:
            return state;
    }
};

export default authReducer;
