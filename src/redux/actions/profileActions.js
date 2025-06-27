// Константы для профиля
export const FETCH_USER_TASKS_REQUEST = 'FETCH_USER_TASKS_REQUEST';
export const FETCH_USER_TASKS_SUCCESS = 'FETCH_USER_TASKS_SUCCESS';
export const FETCH_USER_TASKS_FAILURE = 'FETCH_USER_TASKS_FAILURE';

export const FETCH_TASK_STATISTICS_REQUEST = 'FETCH_TASK_STATISTICS_REQUEST';
export const FETCH_TASK_STATISTICS_SUCCESS = 'FETCH_TASK_STATISTICS_SUCCESS';
export const FETCH_TASK_STATISTICS_FAILURE = 'FETCH_TASK_STATISTICS_FAILURE';

export const DELETE_USER_TASK_REQUEST = 'DELETE_USER_TASK_REQUEST';
export const DELETE_USER_TASK_SUCCESS = 'DELETE_USER_TASK_SUCCESS';
export const DELETE_USER_TASK_FAILURE = 'DELETE_USER_TASK_FAILURE';

export const UPDATE_TASK_STATUS_REQUEST = 'UPDATE_TASK_STATUS_REQUEST';
export const UPDATE_TASK_STATUS_SUCCESS = 'UPDATE_TASK_STATUS_SUCCESS';
export const UPDATE_TASK_STATUS_FAILURE = 'UPDATE_TASK_STATUS_FAILURE';

// Экшен-криэйторы для получения задач пользователя
export const fetchUserTasksRequest = (userId, filter = null) => ({
    type: FETCH_USER_TASKS_REQUEST,
    payload: { userId, filter }
});

export const fetchUserTasksSuccess = (tasks) => ({
    type: FETCH_USER_TASKS_SUCCESS,
    payload: tasks
});

export const fetchUserTasksFailure = (error) => ({
    type: FETCH_USER_TASKS_FAILURE,
    payload: error
});

// Экшен-криэйторы для статистики
export const fetchTaskStatisticsRequest = (userId) => ({
    type: FETCH_TASK_STATISTICS_REQUEST,
    payload: { userId }
});

export const fetchTaskStatisticsSuccess = (statistics) => ({
    type: FETCH_TASK_STATISTICS_SUCCESS,
    payload: statistics
});

export const fetchTaskStatisticsFailure = (error) => ({
    type: FETCH_TASK_STATISTICS_FAILURE,
    payload: error
});

// Экшен-криэйторы для удаления задачи
export const deleteUserTaskRequest = (taskId) => ({
    type: DELETE_USER_TASK_REQUEST,
    payload: { taskId }
});

export const deleteUserTaskSuccess = (taskId) => ({
    type: DELETE_USER_TASK_SUCCESS,
    payload: { taskId }
});

export const deleteUserTaskFailure = (error) => ({
    type: DELETE_USER_TASK_FAILURE,
    payload: error
});

// Экшен-криэйторы для обновления статуса задачи
export const updateTaskStatusRequest = (taskId, status) => ({
    type: UPDATE_TASK_STATUS_REQUEST,
    payload: { taskId, status }
});

export const updateTaskStatusSuccess = (taskId, status) => ({
    type: UPDATE_TASK_STATUS_SUCCESS,
    payload: { taskId, status }
});

export const updateTaskStatusFailure = (error) => ({
    type: UPDATE_TASK_STATUS_FAILURE,
    payload: error
});