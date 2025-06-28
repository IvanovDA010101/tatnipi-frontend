import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import Button from '../Button/Button.jsx';
import styles from './ResultModal.module.css';

const ResultModal = ({
                         title,
                         message,
                         onClose,
                         type = 'success',
                         showCloseButton = true,
                         closeOnOverlayClick = true,
                         closeOnEscape = true,
                         maxWidth = '500px'
                     }) => {
    const handleKeyDown = useCallback((e) => {
        if (closeOnEscape && e.key === 'Escape') {
            onClose();
        }
    }, [closeOnEscape, onClose]);

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (closeOnEscape) {
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [handleKeyDown, closeOnEscape]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '✅';
        }
    };

    const getButtonVariant = () => {
        switch (type) {
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'primary';
        }
    };

    return (
        <div
            className={styles.modalOverlay}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-message"
        >
            <div
                className={styles.modalContent}
                style={{ maxWidth }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`${styles.modalHeader} ${styles[type]}`}>
                    <div className={styles.headerContent}>
                        <span className={styles.icon} aria-hidden="true">
                            {getIcon()}
                        </span>
                        <h3 id="modal-title" className={styles.modalTitle}>
                            {title}
                        </h3>
                    </div>
                    {showCloseButton && (
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Закрыть модальное окно"
                            type="button"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className={styles.modalBody}>
                    <div id="modal-message" className={styles.messageContainer}>
                        {typeof message === 'string' ? (
                            <pre className={styles.resultText}>{message}</pre>
                        ) : (
                            <div className={styles.resultContent}>{message}</div>
                        )}
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <Button
                        onClick={onClose}
                        variant={getButtonVariant()}
                        size="medium"
                        autoFocus
                    >
                        ОК
                    </Button>
                </div>
            </div>
        </div>
    );
};

ResultModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    showCloseButton: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    maxWidth: PropTypes.string,
};

export default ResultModal;