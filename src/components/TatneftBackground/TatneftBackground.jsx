import React from 'react';
import styles from './TatneftBackground.module.css';

/**
 * Фирменный фоновый компонент Татнефти
 * Создает фон в соответствии с официальным брендбуком
 */
const TatneftBackground = ({
                               variant = 'default', // 'default', 'auth', 'dashboard', 'minimal'
                               animated = true,
                               overlay = true,
                               className = ''
                           }) => {
    return (
        <div className={`${styles.backgroundContainer} ${styles[variant]} ${className}`}>
            {/* Основной градиентный фон */}
            <div className={styles.gradientBase}/>

            {/* Фирменные декоративные элементы */}
            <div className={`${styles.decorativeElements} ${animated ? styles.animated : ''}`}>
                {/* Красные и зеленые волны из брендбука */}
                <div className={`${styles.wave} ${styles.waveGreen} ${styles.wave1}`}/>
                <div className={`${styles.wave} ${styles.waveRed} ${styles.wave2}`}/>
                <div className={`${styles.wave} ${styles.waveGreen} ${styles.wave3}`}/>
                <div className={`${styles.wave} ${styles.waveRed} ${styles.wave4}`}/>

                {/* Геометрические элементы */}
                <div className={`${styles.geometric} ${styles.circle1}`}/>
                <div className={`${styles.geometric} ${styles.circle2}`}/>
                <div className={`${styles.geometric} ${styles.triangle1}`}/>
                <div className={`${styles.geometric} ${styles.triangle2}`}/>
            </div>

            {/* Паттерн сетки */}
            <div className={styles.gridPattern}/>

            {/* Фирменные линии */}
            <div className={styles.brandLines}>
                <div className={`${styles.brandLine} ${styles.line1}`}/>
                <div className={`${styles.brandLine} ${styles.line2}`}/>
                <div className={`${styles.brandLine} ${styles.line3}`}/>
            </div>

            {/* Оверлей для лучшей читаемости */}
            {overlay && <div className={styles.overlay}/>
            }

            {/* Фирменный логотипный паттерн (тонкий) */
            }
            <div className={styles.logoPattern}/>
        </div>
    )
        ;
};

export default TatneftBackground;