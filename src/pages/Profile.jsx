import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';


import {deleteUserTaskRequest, fetchUserTasksRequest} from '../redux/actions/profileActions.js';
import styles from './Profile.module.css';
import FullScreenToolContainer from "../layouts/FullScreenToolContainer/FullScreenToolContainer.jsx";

export const Profile = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('all'); // all, completed, pending

    console.log('Profile component rendering...');

    // Безопасное получение состояния store
    const storeState = useSelector(store => store);
    console.log('Full store state:', storeState);

    // Проверяем наличие profile в store
    if (!storeState.profile) {
        console.error('Profile state not found in store!');
        console.log('Available store keys:', Object.keys(storeState));
        return (
            <FullScreenToolContainer name="Профиль пользователя">
                <div className={styles.profileContainer}>
                    <div className={styles.errorState}>
                        <div className={styles.errorIcon}>⚠️</div>
                        <h3>Ошибка конфигурации</h3>
                        <p>Состояние профиля не найдено в store. Проверьте настройки Redux.</p>
                        <p>Доступные ключи: {Object.keys(storeState).join(', ')}</p>
                    </div>
                </div>
            </FullScreenToolContainer>
        );
    }

    // Данные из Redux store с безопасной деструктуризацией
    const profileState = useSelector(store => store.profile || {});
    const {
        userTasks: tasks = [],
        taskStatistics = {total: 0, completed: 0, pending: 0},
        isLoadingTasks = false,
        tasksError = null
    } = profileState;

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        console.log('Profile component mounted, dispatching fetchUserTasksRequest...');
        console.log('Dispatch function:', dispatch);
        console.log('fetchUserTasksRequest:', fetchUserTasksRequest);

        const action = fetchUserTasksRequest();
        console.log('Created action:', action);

        dispatch(action);
        console.log('Action dispatched');

        // Временное решение - загружаем данные напрямую в компонент
        console.log('Making direct API call and setting local state...');

        const loadTasksDirectly = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/profile/tasks`, {
                    headers: {
                        'Authorization': `Bearer ${storeState.auth?.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                });

                console.log('Direct API response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Direct API response data:', data);
                    console.log('Direct API data type:', typeof data, 'Is array:', Array.isArray(data));

                    // Принудительно отправляем SUCCESS экшен с данными
                    if (Array.isArray(data) && data.length > 0) {
                        console.log('Forcing SUCCESS action with data:', data);
                        dispatch({
                            type: 'FETCH_USER_TASKS_SUCCESS',
                            payload: data
                        });
                    }
                } else {
                    console.error('Direct API error status:', response.status);
                }
            } catch (error) {
                console.error('Direct API error:', error);
            }
        };

        loadTasksDirectly();
    }, [dispatch, storeState.auth?.accessToken]);

    // Отладочная информация
    useEffect(() => {
        console.log('Profile state:', profileState);
        console.log('Tasks:', tasks);
        console.log('Statistics:', taskStatistics);
        console.log('Is loading:', isLoadingTasks);
        console.log('Error:', tasksError);
    }, [profileState, tasks, taskStatistics, isLoadingTasks, tasksError]);

    // Фильтрация и сортировка задач на клиенте
    const filteredAndSortedTasks = tasks
        .filter(task => {
            if (filter === 'completed') return task.status === true;
            if (filter === 'pending') return task.status === false;
            return true; // all - показываем ВСЕ задачи без исключения
        })
        .sort((a, b) => {
            // Сортируем по ID (больший ID = более новая задача)
            return b.id - a.id;
        });

    console.log('Filtered and sorted tasks:', filteredAndSortedTasks);
    console.log('Total tasks to display:', filteredAndSortedTasks.length);

    // Статистика из Redux или вычисленная из задач
    const totalTasks = taskStatistics.total || tasks.length;
    const completedTasks = taskStatistics.completed || tasks.filter(task => task.status === true).length;
    const pendingTasks = taskStatistics.pending || (totalTasks - completedTasks);

    const handleDeleteTask = (taskId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            dispatch(deleteUserTaskRequest(taskId));
        }
    };

    const handleRefresh = () => {
        console.log('Refreshing tasks...');
        dispatch(fetchUserTasksRequest());
    };

    // Показываем загрузку
    if (isLoadingTasks) {
        return (
            <FullScreenToolContainer name="Профиль пользователя">
                <div className={styles.profileContainer}>
                    <div className={styles.loadingState}>
                        <div className={styles.loadingIcon}>⏳</div>
                        <p>Загрузка задач...</p>
                    </div>
                </div>
            </FullScreenToolContainer>
        );
    }

    // Показываем ошибку
    if (tasksError) {
        return (
            <FullScreenToolContainer name="Профиль пользователя">
                <div className={styles.profileContainer}>
                    <div className={styles.errorState}>
                        <div className={styles.errorIcon}>❌</div>
                        <h3>Ошибка загрузки</h3>
                        <p>{tasksError}</p>
                        <button
                            onClick={handleRefresh}
                            className={styles.retryButton}
                        >
                            Попробовать снова
                        </button>
                    </div>
                </div>
            </FullScreenToolContainer>
        );
    }

    return (
        <FullScreenToolContainer name="Профиль пользователя">
            <div className={styles.profileContainer}>
                {/* Заголовок с кнопкой обновления */}
                <div className={styles.profileHeader}>
                    <h2 className={styles.profileTitle}>Мои задачи</h2>
                    <button
                        onClick={handleRefresh}
                        className={styles.refreshButton}
                        disabled={isLoadingTasks}
                    >
                        🔄 Обновить
                    </button>
                </div>

                {/* Статистика */}
                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📝</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{totalTasks}</span>
                            <span className={styles.statLabel}>Всего задач</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>✅</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{completedTasks}</span>
                            <span className={styles.statLabel}>Завершено</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⏳</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{pendingTasks}</span>
                            <span className={styles.statLabel}>В процессе</span>
                        </div>
                    </div>
                </div>

                {/* Фильтры */}
                <div className={styles.filterContainer}>
                    <div className={styles.filterButtons}>
                        <button
                            className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Все задачи ({totalTasks})
                        </button>
                        <button
                            className={`${styles.filterButton} ${filter === 'completed' ? styles.active : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Завершенные ({completedTasks})
                        </button>
                        <button
                            className={`${styles.filterButton} ${filter === 'pending' ? styles.active : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            В процессе ({pendingTasks})
                        </button>
                    </div>
                </div>

                {/* Таблица задач - выводим ВСЕ данные из JSON */}
                <div className={styles.tasksContainer}>
                    <div className={styles.debugInfo}>
                        <p>Всего задач в массиве: {tasks.length}</p>
                        <p>Отфильтрованных для отображения: {filteredAndSortedTasks.length}</p>
                        <p>Текущий фильтр: {filter}</p>
                    </div>

                    {filteredAndSortedTasks.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📭</div>
                            <h3>Нет задач для отображения</h3>
                            <p>Всего получено задач: {tasks.length}</p>
                            <p>Попробуйте изменить фильтр или проверьте данные</p>
                            <button
                                onClick={() => {
                                    console.log('Raw tasks data:', tasks);
                                    console.log('Profile state:', profileState);
                                }}
                                className={styles.debugButton}
                            >
                                🔍 Отладка в консоли
                            </button>
                        </div>
                    ) : (
                        <div className={styles.tableContainer}>
                            <table className={styles.tasksTable}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Статус</th>
                                    <th>Время (мин)</th>
                                    <th>Файл результата</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredAndSortedTasks.map((task, index) => (
                                    <tr key={`${task.id}-${index}`} className={styles.tableRow}>
                                        <td className={styles.idCell}>#{task.id}</td>
                                        <td className={styles.nameCell}>
                                            <div className={styles.taskName}>{task.name || 'Без названия'}</div>
                                        </td>
                                        <td className={styles.descriptionCell}>
                                            <div className={styles.taskDescription}>
                                                {task.description || 'Без описания'}
                                            </div>
                                        </td>
                                        <td className={styles.statusCell}>
                                                <span
                                                    className={`${styles.statusBadge} ${task.status ? styles.statusCompleted : styles.statusPending}`}>
                                                    {task.status ? '✅ Завершено' : '⏳ В процессе'}
                                                </span>
                                        </td>
                                        <td className={styles.timeCell}>{task.estimated_time || 0}</td>
                                        <td className={styles.fileCell}>
                                            {task.status && task.doc_path ? (
                                                <a
                                                    href={task.doc_path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.downloadLink}
                                                >
                                                    📄 Скачать
                                                </a>
                                            ) : (
                                                <span className={styles.noFile}>—</span>
                                            )}
                                        </td>
                                        <td className={styles.actionsCell}>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className={styles.deleteButton}
                                                title="Удалить задачу"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Информация о последнем обновлении */}
                {tasks.length > 0 && (
                    <div className={styles.lastUpdated}>
                        <small>
                            Показано {filteredAndSortedTasks.length} из {totalTasks} задач
                            {profileState.lastUpdated && (
                                <> • Обновлено: {new Date(profileState.lastUpdated).toLocaleString('ru-RU')}</>
                            )}
                        </small>
                    </div>
                )}
            </div>
        </FullScreenToolContainer>
    );
};