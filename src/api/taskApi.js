import store from "../redux/store.js";

const BASE_URL = import.meta.env.VITE_BACKEND_HOST;

const fetchWithToken = async (url, options = {}) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    const config = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const taskAPI = {
    fetchTaskOptions1: () => {
        return fetchWithToken(`${BASE_URL}/tasks`);
    },

    fetchTaskOptions2: (taskId) => {
        return fetchWithToken(`${BASE_URL}/tasks?group_task_id=${taskId}`);
    },

    fetchTaskOptions3: (taskId, templateId) => {
        return fetchWithToken(`${BASE_URL}/tasks?group_task_id=${taskId}&task_id=${templateId}`);
    },

    submitTaskData: (taskData) => {
        return fetchWithToken(`${BASE_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    }
};