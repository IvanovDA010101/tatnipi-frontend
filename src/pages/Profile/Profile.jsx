import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserTasksRequest,
    deleteUserTaskRequest
} from '../../redux/actions/profileActions.js';
import FullScreenToolContainer from "../../layouts/FullScreenToolContainer/FullScreenToolContainer.jsx";
import TaskCard from "../../components/TaskCard/TaskCard.jsx";
import TaskGroup from "../../components/TaskGroup/TaskGroup.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from './Profile.module.css';

export const Profile = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('all');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards' or 'groups'
    const [expandedGroups, setExpandedGroups] = useState({});

    const {
        userTasks = [],
        taskStatistics = { total: 0, completed: 0, pending: 0 },
        isLoadingTasks = false,
        tasksError = null
    } = useSelector(state => state.profile || {});

    const { user } = useSelector(state => state.auth);

    // Load tasks on component mount
    useEffect(() => {
        dispatch(fetchUserTasksRequest());
    }, [dispatch]);

    // Memoized filtered and sorted tasks
    const filteredTasks = useMemo(() => {
        return userTasks
            .filter(task => {
                switch (filter) {
                    case 'completed':
                        return task.status === true;
                    case 'pending':
                        return task.status === false;
                    case 'all':
                    default:
                        return true;
                }
            })
            .sort((a, b) => {
                // Sort by created_at or ID (newer first)
                if (a.created_at && b.created_at) {
                    return new Date(b.created_at) - new Date(a.created_at);
                }
                return b.id - a.id;
            });
    }, [userTasks, filter]);

    // Group tasks by type for group view
    const groupedTasks = useMemo(() => {
        const groups = {};
        filteredTasks.forEach(task => {
            const groupName = task.group_name || task.type || 'Общие задачи';
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(task);
        });
        return groups;
    }, [filteredTasks]);

    // Statistics from Redux or computed from tasks
    const stats = useMemo(() => {
        const total = userTasks.length;
        const completed = userTasks.filter(task => task.status === true).length;
        const pending = total - completed;

        return {
            total: taskStatistics.total || total,
            completed: taskStatistics.completed || completed,
            pending: taskStatistics.pending || pending
        };
    }, [userTasks, taskStatistics]);

    const handleDeleteTask = (taskId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            dispatch(deleteUserTaskRequest(taskId));
        }
    };

    const handleRefresh = () => {
        dispatch(fetchUserTasksRequest());
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    if (isLoadingTasks) {
        return (
            <FullScreenToolContainer name="Профиль пользователя">
                <div className={styles.profileContainer}>
                    <div className={styles.loadingState}>
                        <div className={styles.loadingSpinner} />
                        <h3>Загрузка задач...</h3>
                        <p>Пожалуйста, подождите</p>
                    </div>
                </div>
            </FullScreenToolContainer>
        );
    }

    if (tasksError) {
        return (
            <FullScreenToolContainer name="Профиль пользователя">
                <div className={styles.profileContainer}>
                    <div className={styles.errorState}>
                        <div className={styles.errorIcon}>❌</div>
                        <h3>Ошибка загрузки</h3>
                        <p>{tasksError}</p>
                        <Button onClick={handleRefresh} variant="primary">
                            Попробовать снова
                        </Button>
                    </div>
                </div>
            </FullScreenToolContainer>
        );
    }

    return (
        <FullScreenToolContainer name="Профиль пользователя">
            <div className={styles.profileContainer}>
                {/* Header */}
                <div className={styles.profileHeader}>
                    <div className={styles.headerInfo}>
                        <h2 className={styles.profileTitle}>
                            Добро пожаловать, {user?.displayName || user?.login || 'Пользователь'}!
                        </h2>
                        <p className={styles.profileSubtitle}>Управляйте своими задачами</p>
                    </div>
                    <Button
                        onClick={handleRefresh}
                        variant="secondary"
                        icon="🔄"
                        disabled={isLoadingTasks}
                    >
                        Обновить
                    </Button>
                </div>

                {/* Statistics */}
                <div className={styles.statsContainer}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📝</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{stats.total}</span>
                            <span className={styles.statLabel}>Всего задач</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>✅</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{stats.completed}</span>
                            <span className={styles.statLabel}>Завершено</span>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>⏳</div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{stats.pending}</span>
                            <span className={styles.statLabel}>В процессе</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className={styles.controlsContainer}>
                    {/* Filters */}
                    <div className={styles.filterContainer}>
                        <div className={styles.filterButtons}>
                            {[
                                { key: 'all', label: `Все (${stats.total})` },
                                { key: 'completed', label: `Завершенные (${stats.completed})` },
                                { key: 'pending', label: `В процессе (${stats.pending})` }
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    className={`${styles.filterButton} ${filter === key ? styles.active : ''}`}
                                    onClick={() => handleFilterChange(key)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* View Mode Selector */}
                    <div className={styles.viewModeContainer}>
                        <div className={styles.viewModeButtons}>
                            {[
                                { key: 'table', label: '📋', title: 'Таблица' },
                                { key: 'cards', label: '🎯', title: 'Карточки' },
                                { key: 'groups', label: '📁', title: 'Группы' }
                            ].map(({ key, label, title }) => (
                                <button
                                    key={key}
                                    className={`${styles.viewModeButton} ${viewMode === key ? styles.active : ''}`}
                                    onClick={() => handleViewModeChange(key)}
                                    title={title}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tasks Content */}
                <div className={styles.tasksContainer}>
                    {filteredTasks.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📭</div>
                            <h3>Нет задач для отображения</h3>
                            <p>
                                {userTasks.length === 0
                                    ? 'У вас пока нет созданных задач'
                                    : 'Попробуйте изменить фильтр'
                                }
                            </p>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'table' && (
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
                                        {filteredTasks.map(task => (
                                            <tr key={task.id} className={styles.tableRow}>
                                                <td className={styles.idCell}>#{task.id}</td>
                                                <td className={styles.nameCell}>
                                                    {task.name || 'Без названия'}
                                                </td>
                                                <td className={styles.descriptionCell}>
                                                    {task.description || 'Без описания'}
                                                </td>
                                                <td className={styles.statusCell}>
                                                        <span className={`${styles.statusBadge} ${task.status ? styles.statusCompleted : styles.statusPending}`}>
                                                            {task.status ? '✅ Завершено' : '⏳ В процессе'}
                                                        </span>
                                                </td>
                                                <td className={styles.timeCell}>
                                                    {task.estimated_time || 0}
                                                </td>
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

                            {viewMode === 'cards' && (
                                <div className={styles.cardsContainer}>
                                    {filteredTasks.map(task => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onDelete={() => handleDeleteTask(task.id)}
                                        />
                                    ))}
                                </div>
                            )}

                            {viewMode === 'groups' && (
                                <div className={styles.groupsContainer}>
                                    {Object.entries(groupedTasks).map(([groupName, tasks]) => (
                                        <TaskGroup
                                            key={groupName}
                                            groupName={groupName}
                                            tasks={tasks}
                                            isExpanded={expandedGroups[groupName] !== false}
                                            onToggle={() => toggleGroup(groupName)}
                                            onDeleteTask={handleDeleteTask}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer Info */}
                {filteredTasks.length > 0 && (
                    <div className={styles.footerInfo}>
                        <small>
                            Показано {filteredTasks.length} из {stats.total} задач
                        </small>
                    </div>
                )}
            </div>
        </FullScreenToolContainer>
    );
};