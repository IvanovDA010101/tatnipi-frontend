import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../redux/actions/authActions.js";
import ToolContainer from "../../layouts/toolContainer/ToolContainer.jsx";
import RegisterForm from "../../components/registerForm/RegisterForm.jsx";
import styles from "./Register.module.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isRegistered, error } = useSelector(state => state.auth);

    const [credentials, setCredentials] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Redirect if registered
    useEffect(() => {
        if (isRegistered) {
            navigate('/dash');
        }
    }, [isRegistered, navigate]);

    // Validation
    const validateForm = () => {
        const errors = {};

        if (!credentials.login.trim()) {
            errors.login = 'Логин обязателен';
        } else if (credentials.login.length < 3) {
            errors.login = 'Логин должен содержать минимум 3 символа';
        }

        if (!credentials.password.trim()) {
            errors.password = 'Пароль обязателен';
        } else if (credentials.password.length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов';
        }

        if (!credentials.confirmPassword.trim()) {
            errors.confirmPassword = 'Подтверждение пароля обязательно';
        } else if (credentials.password !== credentials.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateForm();
        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            const { confirmPassword, ...registrationData } = credentials;
            dispatch(registerRequest(registrationData));
        }
    };

    const handleInputChange = (field, value) => {
        setCredentials(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear validation error when user starts typing
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        // Clear confirm password error when password changes
        if (field === 'password' && validationErrors.confirmPassword) {
            setValidationErrors(prev => ({
                ...prev,
                confirmPassword: ''
            }));
        }
    };

    return (
        <div className={styles.registerPage}>
            <ToolContainer name="Регистрация">
                <RegisterForm
                    credentials={credentials}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    validationErrors={validationErrors}
                />
            </ToolContainer>
        </div>
    );
};

export default Register;