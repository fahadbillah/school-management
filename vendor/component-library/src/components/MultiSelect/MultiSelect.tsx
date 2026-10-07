import React, { useState, useRef, useEffect, useId, useMemo } from 'react';
import styles from './MultiSelect.module.css';
import { Chip, ChipShape } from '../Chip';
import { Avatar, AvatarProps } from '../Avatar';
import { ChevronDownIcon, CheckIcon } from '../common/Icons';

export type MultiSelectSize = 'sm' | 'md' | 'lg';

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  badgeVariant?: 'primary' | 'success' | 'warning' | 'neutral';
  avatar?: Partial<AvatarProps>;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[], selectedOptions: MultiSelectOption[]) => void;
  size?: MultiSelectSize;
  /** Shape style for the selected chips */
  chipShape?: ChipShape;
  disabled?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  className?: string;
  id?: string;
  maxDisplayedChips?: number;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  placeholder = 'Select items...',
  helperText,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  size = 'md',
  chipShape,
  disabled = false,
  isRequired = false,
  isSearchable = true,
  className,
  id,
  maxDisplayedChips,
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [internalValues, setInternalValues] = useState<string[]>(
    value || defaultValue || []
  );
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValues(value);
    }
  }, [value]);

  const selectedOptions = useMemo(() => {
    return options.filter((opt) => internalValues.includes(opt.value));
  }, [options, internalValues]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.description && opt.description.toLowerCase().includes(q)) ||
        (opt.badge && opt.badge.toLowerCase().includes(q))
    );
  }, [options, searchQuery]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const toggleOption = (opt: MultiSelectOption) => {
    if (opt.disabled || disabled) return;

    let nextValues: string[];
    if (internalValues.includes(opt.value)) {
      nextValues = internalValues.filter((v) => v !== opt.value);
    } else {
      nextValues = [...internalValues, opt.value];
    }

    if (value === undefined) {
      setInternalValues(nextValues);
    }
    const nextOptions = options.filter((o) => nextValues.includes(o.value));
    onChange?.(nextValues, nextOptions);
  };

  const removeValue = (valToRemove: string) => {
    if (disabled) return;
    const nextValues = internalValues.filter((v) => v !== valToRemove);
    if (value === undefined) {
      setInternalValues(nextValues);
    }
    const nextOptions = options.filter((o) => nextValues.includes(o.value));
    onChange?.(nextValues, nextOptions);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (
      e.key === 'Backspace' &&
      searchQuery === '' &&
      internalValues.length > 0
    ) {
      removeValue(internalValues[internalValues.length - 1]);
      return;
    }

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery('');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (
      e.key === 'Enter' &&
      focusedIndex >= 0 &&
      focusedIndex < filteredOptions.length
    ) {
      e.preventDefault();
      toggleOption(filteredOptions[focusedIndex]);
    }
  };

  const chipsToRender = maxDisplayedChips
    ? selectedOptions.slice(0, maxDisplayedChips)
    : selectedOptions;
  const remainingCount = maxDisplayedChips
    ? Math.max(0, selectedOptions.length - maxDisplayedChips)
    : 0;

  const isInvalid = Boolean(errorMessage);

  return (
    <div
      ref={containerRef}
      className={[
        styles.container,
        styles[`size-${size}`],
        isOpen ? styles.isOpen : '',
        disabled ? styles.disabled : '',
        isInvalid ? styles.hasError : '',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label id={`${selectId}-label`} className={styles.label}>
          {label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Main trigger area */}
      <div
        className={styles.trigger}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen && isSearchable) {
              setTimeout(() => inputRef.current?.focus(), 10);
            }
          }
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${selectId}-label` : undefined}
      >
        <div className={styles.chipContainer}>
          {chipsToRender.map((opt) => (
            <Chip
              key={opt.value}
              label={opt.label}
              variant="tonal"
              shape={chipShape || (opt.avatar ? 'pill' : 'rounded')}
              size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
              avatar={
                opt.avatar ? (
                  <Avatar
                    size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'xs'}
                    name={opt.label}
                    {...opt.avatar}
                  />
                ) : undefined
              }
              icon={opt.icon}
              onRemove={() => removeValue(opt.value)}
              disabled={disabled}
            />
          ))}

          {remainingCount > 0 && (
            <span className={styles.moreCount}>+{remainingCount} more</span>
          )}

          {isSearchable ? (
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder={selectedOptions.length === 0 ? placeholder : ''}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!isOpen) setIsOpen(true);
              }}
              onClick={(e) => e.stopPropagation()}
              disabled={disabled}
            />
          ) : (
            selectedOptions.length === 0 && (
              <span className={styles.placeholder}>{placeholder}</span>
            )
          )}
        </div>

        <div className={styles.trailing}>
          {internalValues.length > 0 && !disabled && (
            <button
              type="button"
              className={styles.clearAllButton}
              aria-label="Clear all selections"
              onClick={(e) => {
                e.stopPropagation();
                if (value === undefined) setInternalValues([]);
                onChange?.([], []);
              }}
            >
              Clear
            </button>
          )}
          <span className={styles.chevron}>
            <ChevronDownIcon size={14} />
          </span>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.menu} role="listbox" aria-multiselectable="true">
          {filteredOptions.length === 0 ? (
            <div className={styles.empty}>No matches found</div>
          ) : (
            filteredOptions.map((opt, index) => {
              const isSelected = internalValues.includes(opt.value);
              const isFocused = index === focusedIndex;

              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  className={[
                    styles.option,
                    isSelected ? styles.selected : '',
                    isFocused ? styles.focused : '',
                    opt.disabled ? styles.optionDisabled : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(opt);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <div className={styles.checkboxSlot}>
                    <div
                      className={[
                        styles.checkboxBox,
                        isSelected ? styles.checkboxChecked : '',
                      ].join(' ')}
                    >
                      {isSelected && <CheckIcon size={11} />}
                    </div>
                  </div>

                  {opt.avatar && (
                    <div className={styles.avatarSlot}>
                      <Avatar size="sm" name={opt.label} {...opt.avatar} />
                    </div>
                  )}

                  {!opt.avatar && opt.icon && (
                    <div className={styles.iconSlot}>{opt.icon}</div>
                  )}

                  <div className={styles.labelCol}>
                    <div className={styles.labelRow}>
                      <span className={styles.optionLabel}>{opt.label}</span>
                      {opt.badge && (
                        <span
                          className={[
                            styles.badge,
                            styles[`badge-${opt.badgeVariant || 'primary'}`],
                          ].join(' ')}
                        >
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    {opt.description && (
                      <div className={styles.optionDescription}>
                        {opt.description}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
      {!errorMessage && helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};
