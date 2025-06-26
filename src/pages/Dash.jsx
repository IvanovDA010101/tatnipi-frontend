import ToolContainer from "../layouts/toolContainer/ToolContainer.jsx";
// import {TaskSelect} from "../components/TaskSelect/TaskSelect.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    fetchTaskOptions1Request,
    fetchTaskOptions2Request,
    fetchTaskOptions3Request
} from "../redux/actions/taskActions.js";
import {TaskSelect} from "../components/TaskSelect/TaskSelect.jsx";
// import {
//     fetchTaskOptions1Request,
//     fetchTaskOptions2Request,
//     fetchTaskOptions3Request
// } from "../redux/actions/taskActions.js";

export const Dashboard = () => {
    const dispatch = useDispatch();

    const taskOptions1 = useSelector(store => store?.task.taskOptions1);
    const taskOptions2 = useSelector(store => store?.task.taskOptions2);
    const taskOptions3 = useSelector(store => store?.task.taskOptions3);

    // Локальные состояния для выбранных значений
    const [selectedTask1, setSelectedTask1] = useState(null);
    const [selectedTask2, setSelectedTask2] = useState(null);
    const [selectedTask3, setSelectedTask3] = useState(null);

    const handleTask1Change = (e) => {
        const selectedId = e.target.value;
        const selectedOption = taskOptions1.find(option => {return option.id === Number(selectedId)});
        setSelectedTask1(selectedOption);
        setSelectedTask2(null)
    };

    const handleTask2Change = (e) => {
        const selectedId = e.target.value;
        const selectedOption = taskOptions2.find(option => option.id === Number(selectedId));
        setSelectedTask2(selectedOption);

    };

    const handleTask3Change = (e) => {
        const selectedId = e.target.value;
        const selectedOption = taskOptions3.find(option => option.id === Number(selectedId));
        setSelectedTask2(selectedOption);

    };

    const handleButtonClick = () => {

    }

    useEffect(() =>{
        dispatch(fetchTaskOptions1Request());
    }, [dispatch])

    useEffect(() => {
        console.log(selectedTask1);
        if (selectedTask1) {
            dispatch(fetchTaskOptions2Request(selectedTask1.id));
        }
    }, [selectedTask1, dispatch]);

    // Эффект для загрузки третьего списка опций
    useEffect(() => {
        if (selectedTask2) {
            dispatch(fetchTaskOptions3Request(selectedTask2));
        }
    }, [selectedTask2, dispatch]);

    useEffect(() => {
        if (selectedTask2) {
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
            <button onClick={handleButtonClick}>Подтвердить</button>
        </ToolContainer>
    )
}