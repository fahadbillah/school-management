import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import styles from './Drawer.module.css';
import { CloseIcon } from '../common/Icons';

export type DrawerPlacement = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  placement?: DrawerPlacement;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  placement = 'right',
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  footer,
  children,
  className,
}) => {
  const titleId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const drawerClasses = [
    styles.drawer,
    styles[`placement-${placement}`],
    styles[`size-${size}`],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={drawerClasses}
      >
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title && (
              <h3 id={titleId} className={styles.title}>
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                type="button"
                aria-label="Close drawer"
                onClick={onClose}
                className={styles.closeButton}
              >
                <CloseIcon size={18} />
              </button>
            )}
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </>
  );

  return typeof document !== 'undefined'
    ? createPortal(content, document.body)
    : null;
};

Drawer.displayName = 'Drawer';
