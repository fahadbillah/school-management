import React, { useState } from 'react';
import styles from './Avatar.module.css';
import { UserFallbackIcon } from '../common/Icons';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';
export type AvatarVariant = 'tint' | 'solid';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  status?: AvatarStatus;
}

function getInitials(name?: string, explicitInitials?: string): string {
  if (explicitInitials) return explicitInitials;
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  name,
  initials: explicitInitials,
  size = 'md',
  variant = 'tint',
  status,
  className,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name, explicitInitials);

  const containerClasses = [
    styles.container,
    styles[`size-${size}`],
    styles[variant],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconSizes: Record<AvatarSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  return (
    <div className={containerClasses} title={name || alt} {...props}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      ) : initials ? (
        <span className={styles.fallback}>{initials}</span>
      ) : (
        <span className={styles.fallback}>
          <UserFallbackIcon size={iconSizes[size]} />
        </span>
      )}

      {status && (
        <span
          className={`${styles.statusDot} ${styles[`status-${status}`]}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
