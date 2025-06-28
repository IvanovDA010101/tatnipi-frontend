import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullScreenToolContainer from "../../layouts/FullScreenToolContainer/FullScreenToolContainer.jsx";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import styles from './Settings.module.css';

const Settings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [settings, setSettings] = useState({
        notifications: true,
        emailUpdates: false,
        theme: 'light',
        language: 'ru',
        autoSave: true
    });

    const [profileData, setProfileData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveSettings = async () => {
        setLoading(true);
        try {
            // TODO: Implement settings save API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
            setMessage({ type: 'success', text: 'Настройки успешно сохранены' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Ошибка при сохранении настроек' });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            // TODO: Implement profile save API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
            setMessage({ type: 'success', text: 'Профиль успешно обновлен' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Ошибка при обновлении профиля' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <FullScreenToolContainer name="Настройки">
            <div className={styles.settingsContainer}>
                {message.text && (
                    <div className={`${styles.message} ${styles[message.type]}`}>
                        {message.text}
                    </div>
                )}

                {/* Profile Settings */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Профиль</h2>
                    <div className={styles.formGroup}>
                        <Input
                            label="Отображаемое имя"
                            value={profileData.displayName}
                            onChange={(value) => handleProfileChange('displayName', value)}
                            placeholder="Введите ваше имя"
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={profileData.email}
                            onChange={(value) => handleProfileChange('email', value)}
                            placeholder="Введите email"
                        />
                        <Input
                            label="Телефон"
                            type="tel"
                            value={profileData.phone}
                            onChange={(value) => handleProfileChange('phone', value)}
                            placeholder="Введите номер телефона"
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button
                            onClick={handleSaveProfile}
                            loading={loading}
                            variant="primary"
                        >
                            Сохранить профиль
                        </Button>
                    </div>
                </section>

                {/* Application Settings */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Настройки приложения</h2>
                    <div className={styles.settingItem}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                                className={styles.checkbox}
                            />
                            Уведомления
                        </label>
                    </div>

                    <div className={styles.settingItem}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={settings.emailUpdates}
                                onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                                className={styles.checkbox}
                            />
                            Email-уведомления
                        </label>
                    </div>

                    <div className={styles.settingItem}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={settings.autoSave}
                                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                                className={styles.checkbox}
                            />
                            Автосохранение
                        </label>
                    </div>

                    <div className={styles.settingItem}>
                        <label className={styles.selectLabel}>
                            Тема:
                            <select
                                value={settings.theme}
                                onChange={(e) => handleSettingChange('theme', e.target.value)}
                                className={styles.select}
                            >
                                <option value="light">Светлая</option>
                                <option value="dark">Темная</option>
                                <option value="auto">Автоматическая</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.settingItem}>
                        <label className={styles.selectLabel}>
                            Язык:
                            <select
                                value={settings.language}
                                onChange={(e) => handleSettingChange('language', e.target.value)}
                                className={styles.select}
                            >
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </label>
                    </div>

                    <div className={styles.buttonGroup}>
                        <Button
                            onClick={handleSaveSettings}
                            loading={loading}
                            variant="secondary"
                        >
                            Сохранить настройки
                        </Button>
                    </div>
                </section>
            </div>
        </FullScreenToolContainer>
    );
};

export default Settings;