import React, { forwardRef, useId } from 'react';
import styles from './Select.module.css';
import { ChevronDownIcon } from '../common/Icons';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  selectSize?: SelectSize;
  options?: SelectOption[];
  placeholder?: string;
  isRequired?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      selectSize = 'md',
      options,
      placeholder,
      isRequired = false,
      disabled = false,
      id,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const hasError = Boolean(errorMessage);

    const containerClasses = [
      styles.container,
      styles[`size-${selectSize}`],
      hasError ? styles.hasError : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {isRequired && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            className={styles.select}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <span className={styles.chevronIcon} aria-hidden="true">
            <ChevronDownIcon size={16} />
          </span>
        </div>
        {hasError && (
          <span
            id={`${selectId}-error`}
            className={styles.errorMessage}
            role="alert"
          >
            {errorMessage}
          </span>
        )}
        {!hasError && helperText && (
          <span id={`${selectId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
