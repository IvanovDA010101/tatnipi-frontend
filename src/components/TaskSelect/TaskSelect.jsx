import PropTypes from 'prop-types';
import styles from "./TaskSelect.module.css";

const TaskSelect = ({
                        options = [],
                        selectedValue,
                        onChange,
                        placeholder = "Выберите опцию",
                        label,
                        disabled = false,
                        error,
                        loading = false,
                        size = 'medium',
                        fullWidth = true,
                        className = ''
                    }) => {
    const selectClasses = [
        styles.select,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
        loading && styles.loading,
        fullWidth && styles.fullWidth,
        className
    ].filter(Boolean).join(' ');

    const containerClasses = [
        styles.container,
        fullWidth && styles.fullWidth
    ].filter(Boolean).join(' ');

    const handleChange = (e) => {
        if (disabled || loading) return;

        const selectedId = e.target.value;
        const selectedOption = options.find(option => option.id === Number(selectedId));

        if (onChange) {
            onChange(selectedOption);
        }
    };

    const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={selectId} className={styles.label}>
                    {label}
                </label>
            )}

            <div className={styles.selectWrapper}>
                <select
                    id={selectId}
                    className={selectClasses}
                    value={selectedValue ? selectedValue.id : ''}
                    onChange={handleChange}
                    disabled={disabled || loading}
                >
                    <option value="" disabled>
                        {loading ? 'Загрузка...' : placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name || option.description || `Опция ${option.id}`}
                        </option>
                    ))}
                </select>

                <div className={styles.selectIcon}>
                    {loading ? (
                        <span className={styles.spinner} />
                    ) : (
                        <span className={styles.arrow}>▼</span>
                    )}
                </div>
            </div>

            {error && (
                <span className={styles.errorMessage}>
                    {error}
                </span>
            )}

            {options.length === 0 && !loading && (
                <span className={styles.emptyMessage}>
                    Нет доступных опций
                </span>
            )}
        </div>
    );
};

TaskSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
    })),
    selectedValue: PropTypes.object,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
};

export default TaskSelect;