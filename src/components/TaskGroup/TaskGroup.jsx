import TaskCard from '../TaskCard/TaskCard.jsx';
import styles from './TaskGroup.module.css';

const TaskGroup = ({ groupName, tasks, isExpanded, onToggle }) => {
    const getGroupIcon = (groupName) => {
        if (groupName.includes('json')) return '📋';
        if (groupName.includes('xlsx')) return '📊';
        return '📝';
    };

    return (
        <div className={styles.taskGroup}>
            <div className={styles.groupHeader} onClick={onToggle}>
                <h2 className={styles.groupTitle}>
                    <span className={styles.groupIcon}>
                        {getGroupIcon(groupName)}
                    </span>
                    {groupName}
                    <span className={styles.taskCount}>({tasks.length})</span>
                </h2>
                <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                    ⌄
                </span>
            </div>

            {isExpanded && (
                <div className={styles.groupContent}>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskGroup;