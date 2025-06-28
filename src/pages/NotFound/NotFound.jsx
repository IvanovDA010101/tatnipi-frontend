import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/dash');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFoundContent}>
                <div className={styles.errorCode}>404</div>

                <h1 className={styles.title}>Страница не найдена</h1>

                <p className={styles.description}>
                    К сожалению, запрашиваемая страница не существует или была перемещена.
                    Проверьте правильность введенного адреса или воспользуйтесь навигацией.
                </p>

                <div className={styles.illustration}>
                    <div className={styles.robot}>🤖</div>
                    <div className={styles.speech}>
                        Упс! Я не могу найти эту страницу
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        onClick={handleGoHome}
                        variant="primary"
                        size="large"
                        icon="🏠"
                    >
                        На главную
                    </Button>

                    <Button
                        onClick={handleGoBack}
                        variant="secondary"
                        size="large"
                        icon="◀️"
                    >
                        Назад
                    </Button>
                </div>

                <div className={styles.suggestions}>
                    <h3>Возможно, вас заинтересует:</h3>
                    <ul className={styles.suggestionsList}>
                        <li>
                            <button
                                className={styles.suggestionLink}
                                onClick={() => navigate('/dash')}
                            >
                                📊 Дашборд
                            </button>
                        </li>
                        <li>
                            <button
                                className={styles.suggestionLink}
                                onClick={() => navigate('/profile')}
                            >
                                👤 Профиль
                            </button>
                        </li>
                        <li>
                            <button
                                className={styles.suggestionLink}
                                onClick={() => navigate('/settings')}
                            >
                                ⚙️ Настройки
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;