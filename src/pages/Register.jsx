import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { registerRequest} from "../redux/actions/authActions.js";
import ToolContainer from "../layouts/toolContainer/ToolContainer.jsx";
import {useNavigate} from "react-router";
import RegisterForm from "../components/registerForm/RegisterForm.jsx";


const Register = () => {
    const dispatch = useDispatch();
    const { loading, isRegistered, error } = useSelector((state) => state.auth); // isRegistered вместо isAuthenticated
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ login: '', password: '', confirmPassword: '' }); // Добавлен confirmPassword
    const [passwordMatch, setPasswordMatch] = useState(true); // Состояние для проверки совпадения паролей


    useEffect(() => {
        if (isRegistered) {
            navigate('/dash');
        }
    }, [isRegistered, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordMatch(credentials.password === credentials.confirmPassword); // Проверка совпадения
        if (passwordMatch) {
            dispatch(registerRequest(credentials));
        }
    };

    return (
        <ToolContainer name="Регистрация">
            <RegisterForm
                credentials={credentials}
                setCredentials={setCredentials}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
                passwordMatch={passwordMatch} // Передача passwordMatch в RegisterForm
                setPasswordMatch={setPasswordMatch} // Передача функции для обновления passwordMatch
            />
        </ToolContainer>
    );
};

export default Register;