import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Input.module.css';

const Input = ({
                   type = 'text',
                   value,
                   onChange,
                   placeholder,
                   label,
                   error,
                   disabled = false,
                   required = false,
                   size = 'medium',
                   fullWidth = false,
                   icon = null,
                   className = '',
                   autoComplete,
                   id,
                   name,
                   maxLength,
                   minLength,
                   pattern,
                   onFocus,
                   onBlur,
                   ...props
               }) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputClasses = [
        styles.input,
        styles[size],
        error && styles.error,
        focused && styles.focused,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        icon && styles.withIcon,
        className
    ].filter(Boolean).join(' ');

    const containerClasses = [
        styles.container,
        fullWidth && styles.fullWidth
    ].filter(Boolean).join(' ');

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value, e);
        }
    };

    const handleFocus = (e) => {
        setFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const handleBlur = (e) => {
        setFocused(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div className={styles.inputWrapper}>
                {icon && (
                    <span className={styles.icon}>
                        {icon}
                    </span>
                )}

                <input
                    id={inputId}
                    name={name || inputId}
                    type={inputType}
                    value={value || ''}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoComplete={autoComplete}
                    maxLength={maxLength}
                    minLength={minLength}
                    pattern={pattern}
                    className={inputClasses}
                    {...props}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={togglePasswordVisibility}
                        tabIndex={-1}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                )}
            </div>

            {error && (
                <span className={styles.errorMessage}>
                    {error}
                </span>
            )}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'url', 'number', 'search']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullWidth: PropTypes.bool,
    icon: PropTypes.node,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    pattern: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default Input;