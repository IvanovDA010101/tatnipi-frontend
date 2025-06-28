import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../redux/actions/authActions.js";
import ToolContainer from "../../layouts/toolContainer/ToolContainer.jsx";
import LoginForm from "../../components/loginForm/LoginForm.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import styles from "./Login.module.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        isAuthenticated,
        error,
        isInitialized
    } = useSelector(state => state.auth);

    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    });

    const [validationErrors, setValidationErrors] = useState({});

    // Debug logging
    useEffect(() => {
        console.log('Login component state:', {
            loading,
            isAuthenticated,
            isInitialized,
            error
        });
    }, [loading, isAuthenticated, isInitialized, error]);

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated && isInitialized) {
            console.log('User is authenticated, redirecting to dashboard...');
            navigate('/dash');
        }
    }, [isAuthenticated, isInitialized, navigate]);

    // Validation
    const validateForm = () => {
        const errors = {};

        if (!credentials.login.trim()) {
            errors.login = 'Логин обязателен';
        }

        if (!credentials.password.trim()) {
            errors.password = 'Пароль обязателен';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Login form submitted with credentials:', credentials);

        const errors = validateForm();
        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log('Form is valid, dispatching login request...');
            dispatch(loginRequest(credentials));
        } else {
            console.log('Form validation errors:', errors);
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
                [field]: undefined
            }));
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.loginTitle}>
                    <h1>Авторизация</h1>
                    <p>Введите ваши данные для входа</p>
                </div>

                <LoginForm
                    credentials={credentials}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                    validationErrors={validationErrors}
                />
            </div>
        </div>
    );
};

export default Login;