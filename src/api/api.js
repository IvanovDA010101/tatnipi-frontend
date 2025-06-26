import store from '../redux/store.js'; // Импортируйте ваш store
import {refreshTokenFailure, refreshTokenRequest, refreshTokenSuccess} from '../redux/actions/authActions';

const BASE_URL = import.meta.env.VITE_BACKEND_HOST;

const api = {
    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        };

        const state = store.getState(); // Получаем состояние из Redux store
        const accessToken = state.auth.accessToken;

        if (accessToken && accessToken !== 'EMPTY') {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                method: options.method || 'POST',
                headers: {
                    ...headers,
                    ...(options.headers || {}),
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    await api.refreshToken(); // Попытка обновить токен
                    return api.request(endpoint, options);
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    },

    async login(credentials) {
        return api.request('/token', {
            method: 'POST',
            body: credentials,
        });
    },

    async refreshToken() {
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        store.dispatch(refreshTokenRequest());

        try {
            const response = await fetch(`${BASE_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to refresh token');
            }

            const { access_token, refresh_token } = await response.json();
            store.dispatch(refreshTokenSuccess({ access_token, refresh_token })); // Сохранение токенов в Redux
        } catch (error) {
            store.dispatch(refreshTokenFailure(error)); // Обработка ошибки в Redux
            throw error;
        }
    },
};

export default api;
