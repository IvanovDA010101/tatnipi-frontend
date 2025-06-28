import PropTypes from 'prop-types';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({
                            size = 'medium',
                            color = 'primary',
                            text = 'Загрузка...',
                            showText = true,
                            fullScreen = false,
                            className = ''
                        }) => {
    const containerClass = fullScreen
        ? `${styles.fullScreenContainer} ${className}`
        : `${styles.container} ${className}`;

    const spinnerClasses = [
        styles.spinner,
        styles[size],
        styles[color]
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClass}>
            <div className={styles.spinnerWrapper}>
                <div className={spinnerClasses}>
                    <div className={styles.spinnerInner}></div>
                    <div className={styles.spinnerInner}></div>
                    <div className={styles.spinnerInner}></div>
                    <div className={styles.spinnerInner}></div>
                </div>
                {showText && text && (
                    <p className={styles.loadingText}>{text}</p>
                )}
            </div>
        </div>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['primary', 'secondary', 'white', 'dark']),
    text: PropTypes.string,
    showText: PropTypes.bool,
    fullScreen: PropTypes.bool,
    className: PropTypes.string,
};

export default LoadingSpinner;