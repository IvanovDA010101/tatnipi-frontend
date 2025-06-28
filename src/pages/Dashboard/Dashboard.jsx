import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    fetchTaskOptions1Request,
    fetchTaskOptions2Request,
    fetchTaskOptions3Request,
    submitTaskDataRequest,
    clearSubmitResult
} from "../../redux/actions/taskActions.js";
import ToolContainer from "../../layouts/toolContainer/ToolContainer.jsx";
import TaskSelect from "../../components/TaskSelect/TaskSelect.jsx";
import ResultModal from "../../components/ResultModal/ResultModal.jsx";
import Button from "../../components/Button/Button.jsx";
import styles from "./Dasboard.module.css";

export const Dashboard = () => {
    const dispatch = useDispatch();

    // Redux state selectors
    const {
        taskOptions1,
        taskOptions2,
        taskOptions3,
        isSubmitting,
        submitSuccess,
        submitResult,
        submitError
    } = useSelector(state => state.task);

    // Local state
    const [selectedTask1, setSelectedTask1] = useState(null);
    const [selectedTask2, setSelectedTask2] = useState(null);
    const [selectedTask3, setSelectedTask3] = useState(null);

    // Event handlers
    const handleTask1Change = (selectedOption) => {
        setSelectedTask1(selectedOption);
        setSelectedTask2(null);
        setSelectedTask3(null);
    };

    const handleTask2Change = (selectedOption) => {
        setSelectedTask2(selectedOption);
        setSelectedTask3(null);
    };

    const handleTask3Change = (selectedOption) => {
        setSelectedTask3(selectedOption);
    };

    const handleSubmit = () => {
        if (!selectedTask1 || !selectedTask2) {
            return;
        }

        const taskData = {
            group_task_id: selectedTask1.id,
            task_id: selectedTask2.id,
            params_id: selectedTask3?.id || null,
        };

        dispatch(submitTaskDataRequest(taskData));
    };

    const handleCloseModal = () => {
        dispatch(clearSubmitResult());
    };

    // Effects
    useEffect(() => {
        dispatch(fetchTaskOptions1Request());
    }, [dispatch]);

    useEffect(() => {
        if (selectedTask1) {
            dispatch(fetchTaskOptions2Request(selectedTask1.id));
        }
    }, [selectedTask1, dispatch]);

    useEffect(() => {
        if (selectedTask1 && selectedTask2) {
            dispatch(fetchTaskOptions3Request(selectedTask1.id, selectedTask2.id));
        }
    }, [selectedTask1, selectedTask2, dispatch]);

    const isSubmitDisabled = !selectedTask1 || !selectedTask2 || isSubmitting;

    return (
        <ToolContainer name="Выбор задачи для выгрузки">
            <div className={styles.dashboard}>
                <div className={styles.selectContainer}>
                    <TaskSelect
                        label="Группа задач"
                        options={taskOptions1}
                        selectedValue={selectedTask1}
                        onChange={handleTask1Change}
                        placeholder="Выберите группу задач"
                    />

                    <TaskSelect
                        label="Задача"
                        options={taskOptions2}
                        selectedValue={selectedTask2}
                        onChange={handleTask2Change}
                        placeholder="Выберите задачу"
                        disabled={!selectedTask1}
                    />

                    <TaskSelect
                        label="Параметры (опционально)"
                        options={taskOptions3}
                        selectedValue={selectedTask3}
                        onChange={handleTask3Change}
                        placeholder="Выберите параметры"
                        disabled={!selectedTask2}
                    />
                </div>

                <div className={styles.submitContainer}>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                        loading={isSubmitting}
                        variant="primary"
                        size="large"
                    >
                        {isSubmitting ? 'Отправка...' : 'Подтвердить'}
                    </Button>
                </div>
            </div>

            {/* Success Modal */}
            {submitSuccess && submitResult && (
                <ResultModal
                    title="Успешно отправлено"
                    message={submitResult.message || JSON.stringify(submitResult, null, 2)}
                    onClose={handleCloseModal}
                    type="success"
                />
            )}

            {/* Error Modal */}
            {submitError && (
                <ResultModal
                    title="Ошибка"
                    message={submitError}
                    onClose={handleCloseModal}
                    type="error"
                />
            )}
        </ToolContainer>
    );
};