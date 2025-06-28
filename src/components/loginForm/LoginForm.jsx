import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import styles from "./LoginForm.module.css";

const LoginForm = ({
                       credentials,
                       onInputChange,
                       onSubmit,
                       loading = false,
                       error,
                       validationErrors = {}
                   }) => {
    const handleInputChange = (field) => (value) => {
        if (onInputChange) {
            onInputChange(field, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    const isFormValid = credentials.login && credentials.password;

    return (
        <div className={styles.loginFormContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                {error && (
                    <div className={styles.errorAlert}>
                        <span className={styles.errorIcon}>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <Input
                        type="text"
                        label="Логин"
                        value={credentials.login}
                        onChange={handleInputChange('login')}
                        placeholder="Введите логин"
                        error={validationErrors.login}
                        disabled={loading}
                        required
                        autoComplete="username"
                        icon="👤"
                        fullWidth
                    />
                </div>

                <div className={styles.inputGroup}>
                    <Input
                        type="password"
                        label="Пароль"
                        value={credentials.password}
                        onChange={handleInputChange('password')}
                        placeholder="Введите пароль"
                        error={validationErrors.password}
                        disabled={loading}
                        required
                        autoComplete="current-password"
                        icon="🔒"
                        fullWidth
                    />
                </div>

                <div className={styles.submitGroup}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        loading={loading}
                        disabled={!isFormValid || loading}
                        fullWidth
                    >
                        {loading ? 'Вход...' : 'Войти'}
                    </Button>
                </div>

                <div className={styles.linkGroup}>
                    <p className={styles.linkText}>
                        Нет аккаунта?{' '}
                        <Link to="/register" className={styles.link}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <Link to="/forgot-password" className={styles.forgotLink}>
                        Забыли пароль?
                    </Link>
                </div>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    credentials: PropTypes.shape({
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    validationErrors: PropTypes.object,
};

export default LoginForm;