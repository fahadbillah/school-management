import React, { forwardRef, useId } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      isRequired = false,
      showCharCount = false,
      maxLength,
      disabled = false,
      value,
      defaultValue,
      id,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const hasError = Boolean(errorMessage);

    const [currentLength, setCurrentLength] = React.useState<number>(() => {
      if (typeof value === 'string') return value.length;
      if (typeof defaultValue === 'string') return defaultValue.length;
      return 0;
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(e.target.value.length);
      onChange?.(e);
    };

    const containerClasses = [
      styles.container,
      hasError ? styles.hasError : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.textareaWrapper}>
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${textareaId}-error`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
            }
            className={styles.textarea}
            {...props}
          />
        </div>
        <div className={styles.footer}>
          {hasError && (
            <span
              id={`${textareaId}-error`}
              className={styles.errorMessage}
              role="alert"
            >
              {errorMessage}
            </span>
          )}
          {!hasError && helperText && (
            <span id={`${textareaId}-helper`} className={styles.helperText}>
              {helperText}
            </span>
          )}
          {showCharCount && maxLength && (
            <span className={styles.charCount}>
              {currentLength} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
