import styles from "./TaskSelect.module.css";

export const TaskSelect = (props) => {
    const { options, selectedValue, onChange } = props;


    return (
        <div>
            {/*<label htmlFor="taskSelect">Выберите задачу:</label>*/}
            <select className={styles.TaskSelectPage} id="taskSelect" value={selectedValue ? selectedValue.id : ''}
                    onChange={onChange}>
                <option value="" disabled>
                    Выберите задачу
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name || option.description}
                    </option>
                ))}
            </select>
        </div>
    );
}