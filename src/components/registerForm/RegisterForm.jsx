import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({
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

    const isFormValid =
        credentials.login &&
        credentials.password &&
        credentials.confirmPassword &&
        credentials.password === credentials.confirmPassword;

    const getPasswordStrength = (password) => {
        if (!password) return { level: 'none', text: '' };

        let score = 0;

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score < 2) return { level: 'weak', text: 'Слабый пароль' };
        if (score < 4) return { level: 'medium', text: 'Средний пароль' };
        return { level: 'strong', text: 'Сильный пароль' };
    };

    const passwordStrength = getPasswordStrength(credentials.password);

    return (
        <div className={styles.registerFormContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
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
                        minLength={3}
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
                        autoComplete="new-password"
                        icon="🔒"
                        fullWidth
                        minLength={6}
                    />
                    {credentials.password && (
                        <div className={`${styles.passwordStrength} ${styles[passwordStrength.level]}`}>
                            {passwordStrength.text}
                        </div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <Input
                        type="password"
                        label="Подтверждение пароля"
                        value={credentials.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        placeholder="Повторите пароль"
                        error={validationErrors.confirmPassword}
                        disabled={loading}
                        required
                        autoComplete="new-password"
                        icon="🔒"
                        fullWidth
                    />
                </div>

                {credentials.password && credentials.confirmPassword && (
                    <div className={styles.passwordMatch}>
                        {credentials.password === credentials.confirmPassword ? (
                            <span className={styles.matchSuccess}>✅ Пароли совпадают</span>
                        ) : (
                            <span className={styles.matchError}>❌ Пароли не совпадают</span>
                        )}
                    </div>
                )}

                <div className={styles.submitGroup}>
                    <Button
                        type="submit"
                        variant="success"
                        size="large"
                        loading={loading}
                        disabled={!isFormValid || loading}
                        fullWidth
                    >
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </div>

                <div className={styles.linkGroup}>
                    <p className={styles.linkText}>
                        Уже есть аккаунт?{' '}
                        <Link to="/login" className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>

                <div className={styles.termsGroup}>
                    <p className={styles.termsText}>
                        Регистрируясь, вы соглашаетесь с{' '}
                        <Link to="/terms" className={styles.termsLink}>
                            Условиями использования
                        </Link>{' '}
                        и{' '}
                        <Link to="/privacy" className={styles.termsLink}>
                            Политикой конфиденциальности
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    credentials: PropTypes.shape({
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        confirmPassword: PropTypes.string.isRequired,
    }).isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    validationErrors: PropTypes.object,
};

export default RegisterForm;