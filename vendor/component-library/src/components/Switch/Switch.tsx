import React, { forwardRef } from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      description,
      checked,
      defaultChecked,
      disabled = false,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const isChecked = checked ?? defaultChecked ?? false;

    const containerClasses = [
      styles.container,
      isChecked ? styles.checked : '',
      disabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={containerClasses}>
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={isChecked}
          className={styles.nativeInput}
          onChange={onChange}
          {...props}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
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

Switch.displayName = 'Switch';
