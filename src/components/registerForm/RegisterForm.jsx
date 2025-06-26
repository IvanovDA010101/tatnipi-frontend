import styles from "./RegisterForm.module.css";
import {useState} from "react";

const RegisterForm = (props) => {
    const { credentials, setCredentials, handleSubmit, loading, error } = props;
    const [passwordMatch, setPasswordMatch] = useState(true); // Состояние для совпадения паролей

    const handlePasswordChange = (e) => {
        setCredentials({ ...credentials, password: e.target.value });
        setPasswordMatch(credentials.confirmPassword === e.target.value); // Проверка совпадения
    };

    const handleConfirmPasswordChange = (e) => {
        setCredentials({ ...credentials, confirmPassword: e.target.value });
        setPasswordMatch(credentials.password === e.target.value); // Проверка совпадения
    };


    return (
        <form onSubmit={handleSubmit}> {/* Добавлено onSubmit */}
            <input
                className={styles.inputForm}
                type="text"
                value={credentials.login}
                onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                placeholder="Username"
                required
            />
            <input
                className={styles.inputForm}
                type="password"
                value={credentials.password}
                onChange={handlePasswordChange}
                placeholder="Password"
                required
            />
            <input
                className={styles.inputForm}
                type="password"
                value={credentials.confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                required
            />
            <div style={{color: 'red'}}>
                {!passwordMatch && <p>Пароли не совпадают!</p>}
            </div>
            <button type="submit" disabled={loading || !passwordMatch}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterForm;
