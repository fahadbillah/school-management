import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      inputSize = 'md',
      leftIcon,
      rightIcon,
      isRequired = false,
      disabled = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(errorMessage);

    const containerClasses = [
      styles.container,
      styles[`size-${inputSize}`],
      hasError ? styles.hasError : '',
      disabled ? styles.disabled : '',
      leftIcon ? styles.hasLeftIcon : '',
      rightIcon ? styles.hasRightIcon : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {leftIcon && (
            <span className={`${styles.iconSlot} ${styles.leftSlot}`}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={styles.input}
            {...props}
          />
          {rightIcon && (
            <span className={`${styles.iconSlot} ${styles.rightSlot}`}>
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && (
          <span
            id={`${inputId}-error`}
            className={styles.errorMessage}
            role="alert"
          >
            {errorMessage}
          </span>
        )}
        {!hasError && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
