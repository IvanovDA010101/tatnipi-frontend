import {
    FETCH_USER_TASKS_REQUEST,
    FETCH_USER_TASKS_SUCCESS,
    FETCH_USER_TASKS_FAILURE,
    FETCH_TASK_STATISTICS_REQUEST,
    FETCH_TASK_STATISTICS_SUCCESS,
    FETCH_TASK_STATISTICS_FAILURE,
    DELETE_USER_TASK_REQUEST,
    DELETE_USER_TASK_SUCCESS,
    DELETE_USER_TASK_FAILURE,
    UPDATE_TASK_STATUS_REQUEST,
    UPDATE_TASK_STATUS_SUCCESS,
    UPDATE_TASK_STATUS_FAILURE
} from '../actions/profileActions.js';

const initialState = {
    // Данные задач
    userTasks: [],
    taskStatistics: {
        total: 0,
        completed: 0,
        pending: 0,
        failed: 0
    },

    // Состояния загрузки
    isLoadingTasks: false,
    isLoadingStatistics: false,
    isDeletingTask: false,
    isUpdatingStatus: false,

    // Ошибки
    tasksError: null,
    statisticsError: null,
    deleteError: null,
    updateError: null,

    // Дополнительные состояния
    lastUpdated: null,
    currentFilter: 'all',
    hasMore: true, // Для пагинации
    currentPage: 1
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        // Получение задач пользователя
        case FETCH_USER_TASKS_REQUEST:
            return {
                ...state,
                isLoadingTasks: true,
                tasksError: null
            };

        case FETCH_USER_TASKS_SUCCESS:
            { const tasks = action.payload;
            console.log('Редьюсер: FETCH_USER_TASKS_SUCCESS получен');
            console.log('Редьюсер: Payload:', tasks);
            console.log('Редьюсер: Tasks count:', tasks.length);

            // Автоматически вычисляем статистику при получении задач
            const autoStatistics = {
                total: tasks.length,
                completed: tasks.filter(task => task.status === true).length,
                pending: tasks.filter(task => task.status === false).length,
                failed: 0
            };

            console.log('Редьюсер: Computed statistics:', autoStatistics);

            const newState = {
                ...state,
                isLoadingTasks: false,
                userTasks: tasks,
                tasksError: null,
                taskStatistics: autoStatistics, // Обновляем статистику автоматически
                lastUpdated: new Date().toISOString()
            };

            console.log('Редьюсер: New state:', newState);
            return newState; }

        case FETCH_USER_TASKS_FAILURE:
            return {
                ...state,
                isLoadingTasks: false,
                tasksError: action.payload,
                userTasks: []
            };

        // Получение статистики
        case FETCH_TASK_STATISTICS_REQUEST:
            return {
                ...state,
                isLoadingStatistics: true,
                statisticsError: null
            };

        case FETCH_TASK_STATISTICS_SUCCESS:
            return {
                ...state,
                isLoadingStatistics: false,
                taskStatistics: action.payload,
                statisticsError: null
            };

        case FETCH_TASK_STATISTICS_FAILURE:
            return {
                ...state,
                isLoadingStatistics: false,
                statisticsError: action.payload
            };

        // Удаление задачи
        case DELETE_USER_TASK_REQUEST:
            return {
                ...state,
                isDeletingTask: true,
                deleteError: null
            };

        case DELETE_USER_TASK_SUCCESS:
            return {
                ...state,
                isDeletingTask: false,
                userTasks: state.userTasks.filter(task => task.id !== action.payload.taskId),
                deleteError: null,
                // Обновляем статистику
                taskStatistics: {
                    ...state.taskStatistics,
                    total: state.taskStatistics.total - 1
                }
            };

        case DELETE_USER_TASK_FAILURE:
            return {
                ...state,
                isDeletingTask: false,
                deleteError: action.payload
            };

        // Обновление статуса задачи
        case UPDATE_TASK_STATUS_REQUEST:
            return {
                ...state,
                isUpdatingStatus: true,
                updateError: null
            };

        case UPDATE_TASK_STATUS_SUCCESS:
            return {
                ...state,
                isUpdatingStatus: false,
                userTasks: state.userTasks.map(task =>
                    task.id === action.payload.taskId
                        ? { ...task, status: action.payload.status }
                        : task
                ),
                updateError: null
            };

        case UPDATE_TASK_STATUS_FAILURE:
            return {
                ...state,
                isUpdatingStatus: false,
                updateError: action.payload
            };

        default:
            return state;
    }
};

export default profileReducer;