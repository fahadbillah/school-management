import React from 'react';
import styles from './Chip.module.css';
import { CloseIcon, CheckIcon } from '../common/Icons';

export type ChipVariant =
  | 'neutral'
  | 'primary'
  | 'tonal'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger';

export type ChipSize = 'sm' | 'md' | 'lg';
export type ChipShape = 'pill' | 'rounded';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  shape?: ChipShape;
  selected?: boolean;
  count?: number | string;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  avatar,
  icon,
  variant,
  size = 'md',
  shape = 'pill',
  selected = false,
  count,
  onRemove,
  disabled = false,
  className,
  onClick,
  ...props
}) => {
  const isClickable = Boolean(onClick) && !disabled;
  const effectiveVariant = variant ?? (avatar ? 'tonal' : 'neutral');

  const chipClasses = [
    styles.chip,
    styles[effectiveVariant],
    styles[size],
    styles[shape],
    avatar ? styles.hasAvatar : '',
    selected ? styles.selected : '',
    isClickable ? styles.clickable : '',
    onRemove ? styles.removable : '',
    disabled ? styles.disabled : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={chipClasses}
      role={isClickable ? 'button' : 'status'}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      {...props}
    >
      {selected && (
        <span className={styles.selectedIcon}>
          <CheckIcon size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
        </span>
      )}
      {!selected && avatar && (
        <span className={styles.avatarSlot}>{avatar}</span>
      )}
      {!selected && !avatar && icon && (
        <span className={styles.iconSlot}>{icon}</span>
      )}
      <span className={styles.label}>{label}</span>
      {count !== undefined && (
        <span className={styles.countBadge}>{count}</span>
      )}
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && onRemove) {
              onRemove();
            }
          }}
          disabled={disabled}
        >
          <CloseIcon size={size === 'sm' ? 10 : size === 'lg' ? 14 : 12} />
        </button>
      )}
    </div>
  );
};
