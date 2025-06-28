import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../redux/actions/authActions.js';
import styles from './Header.module.css';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(state => state.auth);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        closeDropdown();
    };

    const handleDashboardClick = () => {
        navigate('/dash');
        closeDropdown();
    };

    const handleSettingsClick = () => {
        navigate('/settings');
        closeDropdown();
    };

    const handleLogoutClick = () => {
        dispatch(logoutRequest());
        navigate('/login');
        closeDropdown();
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close dropdown on Escape key
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closeDropdown();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoSection}>
                <img
                    src="/header.png"
                    alt="Логотип"
                    className={styles.logoImage}
                    onClick={() => navigate('/')}
                />
            </div>

            <nav className={styles.navigationSection}>
                {isAuthenticated ? (
                    <>
                        <button
                            className={styles.navButton}
                            onClick={handleDashboardClick}
                        >
                            📊 Дашборд
                        </button>

                        <div className={styles.userMenu} ref={dropdownRef}>
                            <button
                                className={styles.userButton}
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                                aria-label="Меню пользователя"
                            >
                                <div className={styles.userAvatar}>
                                    {(user?.displayName || user?.login || 'U').charAt(0).toUpperCase()}
                                </div>
                                <span className={styles.userName}>
                                    {user?.displayName || user?.login || 'Пользователь'}
                                </span>
                                <span className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.open : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div className={styles.dropdown}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleProfileClick}
                                    >
                                        <span className={styles.dropdownIcon}>👤</span>
                                        <span>Профиль</span>
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleSettingsClick}
                                    >
                                        <span className={styles.dropdownIcon}>⚙️</span>
                                        <span>Настройки</span>
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleLogoutClick}
                                    >
                                        <span className={styles.dropdownIcon}>🚪</span>
                                        <span>Выйти</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            className={`${styles.navButton} ${styles.navButtonSecondary}`}
                            onClick={handleLoginClick}
                        >
                            Войти
                        </button>
                        <button
                            className={styles.navButton}
                            onClick={handleRegisterClick}
                        >
                            Регистрация
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;