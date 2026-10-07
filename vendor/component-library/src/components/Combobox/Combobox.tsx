import React, { useState, useRef, useEffect, useId, useMemo } from 'react';
import styles from './Combobox.module.css';
import { SearchIcon, CloseIcon, ChevronDownIcon } from '../common/Icons';

export interface ComboboxOption {
  value: string;
  label: string;
  group?: string;
  badge?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (
    value: string,
    selectedOption: ComboboxOption | undefined
  ) => void;
  disabled?: boolean;
  isRequired?: boolean;
  className?: string;
  id?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  placeholder = 'Search entities...',
  helperText,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  isRequired = false,
  className,
  id,
}) => {
  const generatedId = useId();
  const comboboxId = id || generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    value || defaultValue || ''
  );
  const [query, setQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === internalValue);
  }, [options, internalValue]);

  // Synchronize input query when closed
  useEffect(() => {
    if (!isOpen && selectedOption) {
      setQuery(selectedOption.label);
    } else if (!isOpen && !selectedOption) {
      setQuery('');
    }
  }, [isOpen, selectedOption]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.group && opt.group.toLowerCase().includes(q)) ||
        (opt.badge && opt.badge.toLowerCase().includes(q))
    );
  }, [options, query]);

  // Group filtered options
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: ComboboxOption[] } = {};
    filteredOptions.forEach((opt) => {
      const g = opt.group || '';
      if (!groups[g]) groups[g] = [];
      groups[g].push(opt);
    });
    return groups;
  }, [filteredOptions]);

  // Flattened for keyboard navigation
  const flatOptions = useMemo(() => {
    const list: ComboboxOption[] = [];
    Object.keys(groupedOptions).forEach((g) => {
      list.push(...groupedOptions[g]);
    });
    return list;
  }, [groupedOptions]);

  // Close when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
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

  const selectOption = (opt: ComboboxOption) => {
    if (opt.disabled || disabled) return;
    if (value === undefined) {
      setInternalValue(opt.value);
    }
    setQuery(opt.label);
    setIsOpen(false);
    setFocusedIndex(-1);
    onChange?.(opt.value, opt);
  };

  const clearQuery = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuery('');
    if (value === undefined) {
      setInternalValue('');
    }
    onChange?.('', undefined);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setFocusedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < flatOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : flatOptions.length - 1));
    } else if (
      e.key === 'Enter' &&
      focusedIndex >= 0 &&
      focusedIndex < flatOptions.length
    ) {
      e.preventDefault();
      selectOption(flatOptions[focusedIndex]);
    }
  };

  // Helper for highlighted match text
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className={styles.highlight}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const isInvalid = Boolean(errorMessage);

  return (
    <div
      ref={containerRef}
      className={[
        styles.container,
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
        <label id={`${comboboxId}-label`} className={styles.label}>
          {label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Trigger & Input Bar */}
      <div
        className={styles.trigger}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
        <span className={styles.searchIcon}>
          <SearchIcon size={14} />
        </span>
        <input
          ref={inputRef}
          id={comboboxId}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={`${comboboxId}-popup`}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && !disabled && (
          <button
            type="button"
            className={styles.clearButton}
            aria-label="Clear query"
            onClick={clearQuery}
          >
            <CloseIcon size={12} />
          </button>
        )}
        <span className={styles.chevron}>
          <ChevronDownIcon size={14} />
        </span>
      </div>

      {/* Popover Menu */}
      {isOpen && (
        <div id={`${comboboxId}-popup`} className={styles.menu} role="listbox">
          {flatOptions.length === 0 ? (
            <div className={styles.emptyFallback}>
              <div className={styles.emptyIcon}>!</div>
              <div className={styles.emptyTitle}>No matching records found</div>
              <div className={styles.emptySubtitle}>
                Check spelling or clear query filter
              </div>
            </div>
          ) : (
            <div className={styles.optionsList}>
              {Object.keys(groupedOptions).map((groupTitle) => (
                <div
                  key={groupTitle || 'default-group'}
                  className={styles.groupBlock}
                >
                  {groupTitle && (
                    <div className={styles.groupHeader}>{groupTitle}</div>
                  )}
                  {groupedOptions[groupTitle].map((opt) => {
                    const isSelected = opt.value === internalValue;
                    const optIndex = flatOptions.indexOf(opt);
                    const isFocused = optIndex === focusedIndex;

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
                          selectOption(opt);
                        }}
                        onMouseEnter={() => setFocusedIndex(optIndex)}
                      >
                        <div className={styles.optionContent}>
                          {opt.icon && (
                            <span className={styles.optionIcon}>
                              {opt.icon}
                            </span>
                          )}
                          <span className={styles.optionLabel}>
                            {renderHighlightedText(opt.label, query)}
                          </span>
                        </div>
                        {opt.badge && (
                          <span className={styles.optionBadge}>
                            {opt.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Footer Guide Hints */}
          <div className={styles.footerGuide}>
            <span>↵ Enter to select</span>
            <span>Esc to dismiss</span>
          </div>
        </div>
      )}

      {errorMessage && <span className={styles.errorText}>{errorMessage}</span>}
      {!errorMessage && helperText && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};
