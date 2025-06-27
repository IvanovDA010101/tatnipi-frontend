import ToolContainer from "../layouts/toolContainer/ToolContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    fetchTaskOptions1Request,
    fetchTaskOptions2Request,
    fetchTaskOptions3Request,
    submitTaskDataRequest,
    clearSubmitResult
} from "../redux/actions/taskActions.js";
import {TaskSelect} from "../components/TaskSelect/TaskSelect.jsx";
import {ResultModal} from "../components/ResultModal/ResultModal.jsx"; // Импортируем модальное окно

export const Dashboard = () => {
    const dispatch = useDispatch();

    const taskOptions1 = useSelector(store => store?.task.taskOptions1);
    const taskOptions2 = useSelector(store => store?.task.taskOptions2);
    const taskOptions3 = useSelector(store => store?.task.taskOptions3);
    const isSubmitting = useSelector(store => store?.task.isSubmitting);
    const submitSuccess = useSelector(store => store?.task.submitSuccess);
    const submitResult = useSelector(store => store?.task.submitResult);
    const submitError = useSelector(store => store?.task.submitError);

    const [selectedTask1, setSelectedTask1] = useState(null);
    const [selectedTask2, setSelectedTask2] = useState(null);
    const [selectedTask3, setSelectedTask3] = useState(null);

    const handleTask1Change = (e) => {
        const selectedId = e.target.value;
        const selectedOption = taskOptions1.find(option => option.id === Number(selectedId));
        setSelectedTask1(selectedOption);
        setSelectedTask2(null);
        setSelectedTask3(null);
    };

    const handleTask2Change = (e) => {
        const selectedId = e.target.value;
        const selectedOption = taskOptions2.find(option => option.id === Number(selectedId));
        setSelectedTask2(selectedOption);
        setSelectedTask3(null);
    };

    const handleTask3Change = (e) => {
        const selectedId = e.target.value;
        const selectedOption = taskOptions3.find(option => option.id === Number(selectedId));
        setSelectedTask3(selectedOption);
    };

    const handleButtonClick = () => {
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

    return (
        <ToolContainer name="Выбор задачи для выгрузки">
            <TaskSelect
                options={taskOptions1}
                selectedValue={selectedTask1}
                onChange={handleTask1Change}
            />
            <TaskSelect
                options={taskOptions2}
                selectedValue={selectedTask2}
                onChange={handleTask2Change}
            />
            <TaskSelect
                options={taskOptions3}
                selectedValue={selectedTask3}
                onChange={handleTask3Change}
            />
            <button
                onClick={handleButtonClick}
                disabled={!selectedTask1 || !selectedTask2 || isSubmitting}
            >
                {isSubmitting ? 'Отправка...' : 'Подтвердить'}
            </button>

            {submitSuccess && submitResult && (
                <ResultModal
                    title="Успешно отправлено"
                    message={submitResult.message || JSON.stringify(submitResult, null, 2)}
                    onClose={handleCloseModal}
                    type="success"
                />
            )}

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