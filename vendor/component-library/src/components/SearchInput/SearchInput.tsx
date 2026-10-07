import React, { forwardRef, useState } from 'react';
import styles from './SearchInput.module.css';
import { SearchIcon } from '../common/storybookIconHelper';
import { CloseIcon } from '../common/Icons';

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  shortcutHint?: string;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onClear,
      shortcutHint = '⌘K',
      placeholder = 'Search records, students, classes...',
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      (value as string) || (defaultValue as string) || ''
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as string) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    };

    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        <span className={styles.searchIcon} aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          ref={ref}
          type="search"
          value={currentValue}
          placeholder={placeholder}
          onChange={handleChange}
          className={styles.input}
          {...props}
        />
        <div className={styles.rightSlots}>
          {currentValue && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={handleClear}
              className={styles.clearButton}
            >
              <CloseIcon size={14} />
            </button>
          )}
          {shortcutHint && (
            <kbd className={styles.shortcut}>{shortcutHint}</kbd>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
