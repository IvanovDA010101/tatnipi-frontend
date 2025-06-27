import styles from './ResultModal.module.css';

export const ResultModal = ({title, message, onClose, type = 'success'}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className={styles.modalOverlay}
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`${styles.modalHeader} ${styles[type]}`}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                </div>
                <div className={styles.modalBody}>
                    <pre className={styles.resultText}>{message}</pre>
                </div>
                <div className={styles.modalFooter}>
                    <button
                        onClick={onClose}
                        className={styles.okButton}
                        autoFocus
                    >
                        ОК
                    </button>
                </div>
            </div>
        </div>
    );
};