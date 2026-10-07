import React, { createContext, useContext, forwardRef } from 'react';
import styles from './Radio.module.css';

interface RadioGroupContextType {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onChange,
  label,
  disabled = false,
  className,
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(
    value || defaultValue
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: currentValue,
        onChange: handleChange,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        aria-label={label}
        className={`${styles.group} ${className || ''}`}
      >
        {label && <span className={styles.groupLabel}>{label}</span>}
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      description,
      disabled,
      className,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const group = useContext(RadioGroupContext);

    const isChecked = group ? group.value === value : checked;
    const isDisabled = disabled || group?.disabled || false;
    const inputName = group?.name || props.name;

    const itemClasses = [
      styles.item,
      isChecked ? styles.checked : '',
      isDisabled ? styles.disabled : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      group?.onChange?.(e);
    };

    return (
      <label className={itemClasses}>
        <input
          ref={ref}
          type="radio"
          name={inputName}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className={styles.nativeInput}
          {...props}
        />
        <span className={styles.circle} aria-hidden="true">
          <span className={styles.dot} />
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

Radio.displayName = 'Radio';
