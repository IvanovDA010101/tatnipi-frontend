import store from '../redux/store.js';
import { refreshTokenRequest, refreshTokenSuccess, refreshTokenFailure } from '../redux/actions/authActions';

const BASE_URL = import.meta.env.VITE_BACKEND_HOST;

const api = {
    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        };

        const state = store.getState();
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
                // Если 401 и есть refresh token, пробуем обновить токен только один раз
                if (response.status === 401 && !options._isRetry) {
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        try {
                            console.log('Attempting token refresh for request:', endpoint);
                            await api.refreshTokenDirect();

                            // Повторяем запрос с новым токеном
                            return await api.request(endpoint, { ...options, _isRetry: true });
                        } catch (refreshError) {
                            console.error('Token refresh failed:', refreshError);
                            // Очищаем токены и бросаем ошибку
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                        }
                    }
                }

                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async login(credentials) {
        return api.request('/token', {
            method: 'POST',
            body: credentials,
        });
    },

    async register(credentials) {
        return api.request('/register', {
            method: 'POST',
            body: credentials,
        });
    },

    async getCurrentUser() {
        return api.request('/user/me', {
            method: 'GET',
        });
    },

    async logout() {
        return api.request('/auth/logout', {
            method: 'POST',
        });
    },

    // Прямое обновление токена без Redux диспатчей (для использования в request())
    async refreshTokenDirect() {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

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

        // Обновляем токены в localStorage и Redux store
        localStorage.setItem('access_token', access_token);
        if (refresh_token) {
            localStorage.setItem('refresh_token', refresh_token);
        }

        store.dispatch(refreshTokenSuccess({ access_token, refresh_token }));

        return { access_token, refresh_token };
    },

    // Метод обновления токена через Redux Saga (для использования в saga)
    async refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');

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
            store.dispatch(refreshTokenSuccess({ access_token, refresh_token }));

            return { access_token, refresh_token };
        } catch (error) {
            store.dispatch(refreshTokenFailure(error.message));
            throw error;
        }
    },
};

export default api;