import { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import {useNavigate} from "react-router";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleProfileClick = () => {
        navigate('/profile');
        setIsDropdownOpen(false);
    };

    const handleSettingsClick = () => {
        console.log('Настройки');
        setIsDropdownOpen(false);
    };

    const handleLogoutClick = () => {
        console.log('Выйти');
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Закрытие меню по Escape
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div className={styles.headerContainer}>
            <img src="/header.png" alt="header" className={styles.imgContainer}/>

            <div className={styles.profileSection} ref={dropdownRef}>
                <button
                    className={styles.profileButton}
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                >
                    <img
                        src="/react.svg"
                        alt="Профиль"
                        className={styles.profileImage}
                    />
                </button>

                {isDropdownOpen && (
                    <div className={styles.dropdown}>
                        <ul className={styles.dropdownList}>
                            <li>
                                <button
                                    className={styles.dropdownItem}
                                    onClick={handleProfileClick}
                                >
                                    👤 Профиль
                                </button>
                            </li>
                            <li>
                                <button
                                    className={styles.dropdownItem}
                                    onClick={handleSettingsClick}
                                >
                                    ⚙️ Настройки
                                </button>
                            </li>
                            <li>
                                <button
                                    className={styles.dropdownItem}
                                    onClick={handleLogoutClick}
                                >
                                    🚪 Выйти
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;