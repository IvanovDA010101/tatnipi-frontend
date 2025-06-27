import store from "../redux/store.js";

const BASE_URL = import.meta.env.VITE_BACKEND_HOST;

console.log('ProfileAPI BASE_URL:', BASE_URL);

const fetchWithToken = async (url, options = {}) => {
    const state = store.getState();
    const accessToken = state.auth?.accessToken;

    console.log('fetchWithToken called with URL:', url);
    console.log('Access token available:', !!accessToken);

    if (!accessToken) {
        throw new Error('Токен авторизации отсутствует');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    console.log('Request config:', config);

    try {
        console.log('Making fetch request to:', url);
        const response = await fetch(url, config);

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (response.status === 401) {
            throw new Error('Требуется повторная авторизация');
        }

        if (response.status === 403) {
            throw new Error('Недостаточно прав доступа');
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText);
            throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        return data;

    } catch (error) {
        console.error('Fetch error:', error);

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Ошибка сети. Проверьте подключение к интернету');
        }
        throw error;
    }
};

// Вспомогательные функции для разных типов запросов
const get = (endpoint, params = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);

    // Добавляем параметры запроса если есть
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });

    console.log('GET request URL:', url.toString());
    return fetchWithToken(url.toString());
};

const post = (endpoint, data) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log('POST request URL:', url);
    console.log('POST data:', data);

    return fetchWithToken(url, {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

const put = (endpoint, data) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log('PUT request URL:', url);
    console.log('PUT data:', data);

    return fetchWithToken(url, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};

const del = (endpoint) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log('DELETE request URL:', url);

    return fetchWithToken(url, {
        method: 'DELETE'
    });
};

// API для профиля пользователя
export const profileAPI = {
    // Получение всех задач пользователя (без параметров, согласно Swagger)
    fetchUserTasks: () => {
        console.log('profileAPI.fetchUserTasks called');
        return get('/profile/tasks');
    },

    // Получение информации о профиле пользователя
    fetchProfile: () => {
        console.log('profileAPI.fetchProfile called');
        return get('/profile');
    },

    // Получение конкретной задачи по ID
    fetchTaskById: (taskId) => {
        console.log('profileAPI.fetchTaskById called with ID:', taskId);
        return get(`/tasks/${taskId}`);
    },

    // Удаление задачи
    deleteTask: (taskId) => {
        console.log('profileAPI.deleteTask called with ID:', taskId);
        return del(`/tasks/${taskId}`);
    },

    // Обновление статуса задачи (если нужно в будущем)
    updateTaskStatus: (taskId, status) => {
        console.log('profileAPI.updateTaskStatus called with ID:', taskId, 'status:', status);
        return put(`/tasks/${taskId}/status`, { status });
    },

    // Повторный запуск задачи (если нужно в будущем)
    retryTask: (taskId) => {
        console.log('profileAPI.retryTask called with ID:', taskId);
        return post(`/tasks/${taskId}/retry`, {});
    },

    // Скачивание файла задачи (если нужно в будущем)
    downloadTaskFile: (taskId) => {
        console.log('profileAPI.downloadTaskFile called with ID:', taskId);
        return get(`/tasks/${taskId}/download`);
    },

    // Получение истории задач с пагинацией (если нужно в будущем)
    fetchTaskHistory: (page = 1, limit = 20) => {
        console.log('profileAPI.fetchTaskHistory called with page:', page, 'limit:', limit);
        return get('/profile/tasks/history', { page, limit });
    },

    // Получение статистики задач (если появится отдельная ручка)
    fetchTaskStatistics: () => {
        console.log('profileAPI.fetchTaskStatistics called');
        return get('/profile/tasks/statistics');
    }
};

// Экспортируем также вспомогательные функции для использования в других API
export { get, post, put, del, fetchWithToken };