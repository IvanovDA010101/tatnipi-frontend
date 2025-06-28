import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    CHECK_AUTH_REQUEST,
    CHECK_AUTH_SUCCESS,
    CHECK_AUTH_FAILURE,
} from '../constants.js';

// Initialize state from localStorage
const getInitialState = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    return {
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false, // Will be determined by CHECK_AUTH
        isRegistered: false,
        isInitialized: false, // Important: start as false
    };
};

const initialState = getInitialState();

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Login
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                user: action.payload.user,
                isAuthenticated: true,
                error: null,
                isInitialized: true,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                isInitialized: true,
                accessToken: null,
                refreshToken: null,
            };

        // Register
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                user: action.payload.user,
                isAuthenticated: true,
                isRegistered: true,
                error: null,
                isInitialized: true,
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                isRegistered: false,
                isInitialized: true,
                accessToken: null,
                refreshToken: null,
            };

        // Refresh Token
        case REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                // Don't set loading for refresh token to avoid UI blocking
                error: null
            };

        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
                isAuthenticated: true,
                error: null,
                isInitialized: true,
            };

        case REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                accessToken: null,
                refreshToken: null,
                user: null,
                isAuthenticated: false,
                isInitialized: true,
            };

        // Check Auth
        case CHECK_AUTH_REQUEST:
            return {
                ...state,
                // Only show loading if not already initialized
                loading: !state.isInitialized,
                error: null
            };

        case CHECK_AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true,
                error: null,
                isInitialized: true,
            };

        case CHECK_AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                accessToken: null,
                refreshToken: null,
                user: null,
                isAuthenticated: false,
                isInitialized: true, // Always set to true after check
            };

        // Logout
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };

        case LOGOUT_SUCCESS:
            return {
                ...getInitialState(),
                isInitialized: true, // Keep initialized state
            };

        default:
            return state;
    }
};

export default authReducer;