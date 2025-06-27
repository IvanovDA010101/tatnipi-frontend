import styles from './TaskCard.module.css';

const TaskCard = ({ task, onDelete }) => {
    const getStatusIcon = (status) => {
        return status ? '✅' : '⏳';
    };

    const getStatusText = (status) => {
        return status ? 'Завершено' : 'В процессе';
    };

    const getStatusClass = (status) => {
        return status ? styles.statusCompleted : styles.statusPending;
    };

    const formatDate = (task) => {
        // Проверяем наличие поля created_at
        if (task.created_at) {
            return new Date(task.created_at).toLocaleDateString('ru-RU');
        }
        // Fallback: эмуляция даты на основе ID
        const baseDate = new Date('2024-01-01');
        baseDate.setDate(baseDate.getDate() + task.id);
        return baseDate.toLocaleDateString('ru-RU');
    };

    const handleDownload = (docPath) => {
        if (docPath) {
            window.open(docPath, '_blank');
        }
    };

    // Проверяем, что task существует
    if (!task) {
        return null;
    }

    return (
        <div className={styles.taskCard}>
            <div className={styles.taskHeader}>
                <div className={styles.taskInfo}>
                    <h3 className={styles.taskName}>{task.name || 'Без названия'}</h3>
                    <p className={styles.taskDescription}>{task.description || 'Без описания'}</p>
                </div>
                <div className={`${styles.taskStatus} ${getStatusClass(task.status)}`}>
                    <span className={styles.statusIcon}>{getStatusIcon(task.status)}</span>
                    <span className={styles.statusText}>{getStatusText(task.status)}</span>
                </div>
            </div>

            <div className={styles.taskDetails}>
                <div className={styles.taskMeta}>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>ID:</span>
                        <span className={styles.metaValue}>#{task.id}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Дата создания:</span>
                        <span className={styles.metaValue}>{formatDate(task)}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Время выполнения:</span>
                        <span className={styles.metaValue}>{task.estimated_time || 0} мин</span>
                    </div>
                </div>

                <div className={styles.taskActionsContainer}>
                    {task.status && task.doc_path && (
                        <div className={styles.taskActions}>
                            <button
                                className={styles.downloadButton}
                                onClick={() => handleDownload(task.doc_path)}
                            >
                                📄 Скачать результат
                            </button>
                        </div>
                    )}

                    {!task.status && (
                        <div className={styles.taskProgress}>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill}></div>
                            </div>
                            <span className={styles.progressText}>Обработка...</span>
                        </div>
                    )}

                    {onDelete && (
                        <div className={styles.taskActions}>
                            <button
                                className={styles.deleteButton}
                                onClick={onDelete}
                            >
                                🗑️ Удалить
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;