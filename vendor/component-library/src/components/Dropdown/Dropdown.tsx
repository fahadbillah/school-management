import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './Dropdown.module.css';
import { Avatar, AvatarProps } from '../Avatar';
import { ChevronDownIcon, CheckIcon } from '../common/Icons';

export type DropdownSize = 'sm' | 'md' | 'lg';

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  avatar?: Partial<AvatarProps>;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: DropdownOption) => void;
  size?: DropdownSize;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Select an option...',
  helperText,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  size = 'md',
  disabled = false,
  isRequired = false,
  className,
  id,
}) => {
  const generatedId = useId();
  const dropdownId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(
    value || defaultValue
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === internalValue);
  const hasError = Boolean(errorMessage);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    setInternalValue(option.value);
    onChange?.(option.value, option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex(
        (opt) => opt.value === internalValue
      );
      const nextOption = options[currentIndex + 1];
      if (nextOption && !nextOption.disabled) {
        handleSelect(nextOption);
      }
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex(
        (opt) => opt.value === internalValue
      );
      const prevOption = options[currentIndex - 1];
      if (prevOption && !prevOption.disabled) {
        handleSelect(prevOption);
      }
    }
  };

  const containerClasses = [
    styles.container,
    styles[`size-${size}`],
    isOpen ? styles.isOpen : '',
    hasError ? styles.hasError : '',
    disabled ? styles.disabled : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const avatarSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';

  return (
    <div ref={containerRef} className={containerClasses}>
      {label && (
        <label id={`${dropdownId}-label`} className={styles.label}>
          {label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}

      <button
        type="button"
        id={dropdownId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={
          label ? `${dropdownId}-label ${dropdownId}` : undefined
        }
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={styles.trigger}
      >
        <div className={styles.selectedContent}>
          {selectedOption ? (
            <>
              {selectedOption.avatar && (
                <Avatar
                  size={selectedOption.avatar.size || avatarSize}
                  {...selectedOption.avatar}
                />
              )}
              {selectedOption.icon && <span>{selectedOption.icon}</span>}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        <span
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        >
          <ChevronDownIcon size={16} />
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-labelledby={`${dropdownId}-label`}
          className={styles.menu}
        >
          {options.map((option) => {
            const isSelected = option.value === internalValue;
            const itemClasses = [
              styles.menuItem,
              isSelected ? styles.itemSelected : '',
              option.disabled ? styles.itemDisabled : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={itemClasses}
              >
                <div className={styles.itemLeft}>
                  {option.avatar && (
                    <Avatar
                      size={option.avatar.size || avatarSize}
                      {...option.avatar}
                    />
                  )}
                  {option.icon && <span>{option.icon}</span>}
                  <div className={styles.itemText}>
                    <span className={styles.itemLabel}>{option.label}</span>
                    {option.description && (
                      <span className={styles.itemDescription}>
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <span className={styles.checkSlot} aria-hidden="true">
                    <CheckIcon size={14} />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {hasError && (
        <span
          id={`${dropdownId}-error`}
          className={styles.errorMessage}
          role="alert"
        >
          {errorMessage}
        </span>
      )}
      {!hasError && helperText && (
        <span id={`${dropdownId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
