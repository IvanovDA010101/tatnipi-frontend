import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
    FETCH_USER_TASKS_REQUEST,
    FETCH_TASK_STATISTICS_REQUEST,
    DELETE_USER_TASK_REQUEST,
    UPDATE_TASK_STATUS_REQUEST,
    fetchUserTasksSuccess,
    fetchUserTasksFailure,
    fetchTaskStatisticsSuccess,
    fetchTaskStatisticsFailure,
    deleteUserTaskSuccess,
    deleteUserTaskFailure,
    updateTaskStatusSuccess,
    updateTaskStatusFailure
} from '../actions/profileActions.js';
import { profileAPI } from '../../api/profileApi.js';

// Получение текущего пользователя из состояния
const getCurrentUser = (state) => state.auth.user;

function* fetchUserTasksSaga() {
    try {
        console.log('Сага: Загружаем задачи пользователя из /profile/tasks');

        const response = yield call(profileAPI.fetchUserTasks);
        console.log('Сага: Raw API response:', response);
        console.log('Сага: Response type:', typeof response);
        console.log('Сага: Is Array:', Array.isArray(response));

        // API возвращает массив задач напрямую согласно Swagger
        const tasks = Array.isArray(response) ? response : [];

        console.log('Сага: Processed tasks array:', tasks);
        console.log('Сага: Tasks count:', tasks.length);

        // Сортируем задачи по ID (самые свежие вначале, так как created_at может отсутствовать)
        const sortedTasks = tasks.sort((a, b) => {
            // Сначала пробуем сортировать по created_at если есть
            if (a.created_at && b.created_at) {
                return new Date(b.created_at) - new Date(a.created_at);
            }
            // Иначе сортируем по ID (больший ID = более новая задача)
            return b.id - a.id;
        });

        console.log('Сага: Задачи успешно загружены и отсортированы:', sortedTasks);
        console.log('Сага: Отправляем SUCCESS экшен с данными:', sortedTasks);

        yield put(fetchUserTasksSuccess(sortedTasks));

    } catch (error) {
        console.error('Сага: Ошибка при загрузке задач пользователя:', error);
        yield put(fetchUserTasksFailure(error.message));
    }
}

function* fetchTaskStatisticsSaga() {
    try {
        console.log('Вычисляем статистику на основе полученных задач');

        // Получаем текущие задачи из состояния
        const currentTasks = yield select(state => state.profile.userTasks || []);

        if (currentTasks.length === 0) {
            console.log('Задач нет, статистика будет пустой');
        }

        // Вычисляем статистику на основе полученных задач
        const statistics = {
            total: currentTasks.length,
            completed: currentTasks.filter(task => task.status === true).length,
            pending: currentTasks.filter(task => task.status === false).length,
            failed: 0 // Пока что предполагаем, что нет отдельного статуса для неудачных задач
        };

        console.log('Статистика вычислена:', statistics);
        yield put(fetchTaskStatisticsSuccess(statistics));

    } catch (error) {
        console.error('Ошибка при вычислении статистики:', error);
        yield put(fetchTaskStatisticsFailure(error.message));
    }
}

function* deleteUserTaskSaga(action) {
    try {
        const { taskId } = action.payload;

        console.log('Удаляем задачу:', taskId);

        yield call(profileAPI.deleteTask, taskId);

        console.log('Задача успешно удалена:', taskId);
        yield put(deleteUserTaskSuccess(taskId));

        // Опционально: обновляем список задач после удаления
        const currentUser = yield select(getCurrentUser);
        if (currentUser?.id) {
            yield put({ type: FETCH_USER_TASKS_REQUEST, payload: { userId: currentUser.id } });
        }

    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
        yield put(deleteUserTaskFailure(error.message));
    }
}

function* updateTaskStatusSaga(action) {
    try {
        const { taskId, status } = action.payload;

        console.log('Обновляем статус задачи:', taskId, 'новый статус:', status);

        yield call(profileAPI.updateTaskStatus, taskId, status);

        console.log('Статус задачи успешно обновлен:', taskId);
        yield put(updateTaskStatusSuccess(taskId, status));

    } catch (error) {
        console.error('Ошибка при обновлении статуса задачи:', error);
        yield put(updateTaskStatusFailure(error.message));
    }
}

// Основная сага профиля
export function* profileSaga() {
    console.log('Profile saga initialized');
    yield takeLatest(FETCH_USER_TASKS_REQUEST, fetchUserTasksSaga);
    yield takeLatest(FETCH_TASK_STATISTICS_REQUEST, fetchTaskStatisticsSaga);
    yield takeLatest(DELETE_USER_TASK_REQUEST, deleteUserTaskSaga);
    yield takeLatest(UPDATE_TASK_STATUS_REQUEST, updateTaskStatusSaga);
    console.log('Profile saga watchers set up');
}