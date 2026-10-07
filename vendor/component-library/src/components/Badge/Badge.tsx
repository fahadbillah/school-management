import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  withDot?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  withDot = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) => {
  const classNames = [
    styles.badge,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} {...props}>
      {withDot && <span className={styles.dot} aria-hidden="true" />}
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </span>
  );
};

Badge.displayName = 'Badge';
