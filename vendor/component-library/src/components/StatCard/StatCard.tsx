import React from 'react';
import styles from './StatCard.module.css';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  icon?: React.ReactNode;
  highlighted?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  trend,
  icon,
  highlighted = false,
  className,
  ...props
}) => {
  const cardClasses = [
    styles.card,
    highlighted ? styles['variant-highlight'] : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      <div className={styles.topRow}>
        <h4 className={styles.title}>{title}</h4>
        {icon && <span className={styles.iconSlot}>{icon}</span>}
      </div>

      <div className={styles.metricRow}>
        <span className={styles.value}>{value}</span>
        {trend && (
          <span
            className={`${styles.trendBadge} ${styles[`trend-${trend.direction}`]}`}
          >
            {trend.direction === 'up' && '↑ '}
            {trend.direction === 'down' && '↓ '}
            {trend.value}
          </span>
        )}
      </div>

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

StatCard.displayName = 'StatCard';
