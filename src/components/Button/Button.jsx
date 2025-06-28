import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
                    children,
                    onClick,
                    disabled = false,
                    loading = false,
                    variant = 'primary',
                    size = 'medium',
                    type = 'button',
                    fullWidth = false,
                    icon = null,
                    className = '',
                    ...props
                }) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
    ].filter(Boolean).join(' ');

    const handleClick = (e) => {
        if (!disabled && !loading && onClick) {
            onClick(e);
        }
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            {icon && !loading && <span className={styles.icon}>{icon}</span>}
            <span className={styles.text}>{children}</span>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    fullWidth: PropTypes.bool,
    icon: PropTypes.node,
    className: PropTypes.string,
};

export default Button;