import React, { forwardRef, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';
import { CheckIcon, MinusIcon } from '../common/Icons';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      checked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      className,
      onChange,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef =
      (forwardedRef as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (inputRef && 'current' in inputRef && inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    const isChecked = checked ?? defaultChecked ?? false;

    const containerClasses = [
      styles.container,
      description ? styles.hasDescription : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const boxClasses = [
      styles.box,
      indeterminate ? styles.indeterminate : isChecked ? styles.checked : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={containerClasses}>
        <input
          type="checkbox"
          ref={inputRef}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className={styles.nativeInput}
          onChange={onChange}
          {...props}
        />
        <span className={boxClasses} aria-hidden="true">
          {indeterminate && <MinusIcon size={12} />}
          {!indeterminate && isChecked && <CheckIcon size={12} />}
        </span>
        {(label || description) && (
          <span className={styles.textGroup}>
            {label && <span className={styles.label}>{label}</span>}
            {description && (
              <span className={styles.description}>{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
