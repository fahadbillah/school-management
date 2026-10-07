import React, { useState, useRef, useEffect } from 'react';
import styles from './Navigation.module.css';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  CheckIcon,
  MenuIcon,
  CloseIcon,
} from '../common/Icons';

/* ==========================================================================
   1. BottomNavigation (Mobile Bottom Tab Bar - Height 80px M3 Baseline)
   ========================================================================== */

export interface BottomNavigationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: string | number;
  isActive?: boolean;
}

export const BottomNavigationItem = React.forwardRef<
  HTMLButtonElement,
  BottomNavigationItemProps
>(
  (
    {
      id,
      label,
      icon,
      activeIcon,
      badge,
      isActive = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-testid={`bottom-nav-item-${id}`}
        className={`${styles.bottomNavItem} ${
          isActive ? styles.bottomNavItemActive : ''
        } ${className}`.trim()}
        onClick={onClick}
        {...props}
      >
        <div className={styles.bottomNavIconWrapper}>
          {isActive ? (
            <div className={styles.bottomNavActivePill}>
              {activeIcon || icon}
            </div>
          ) : (
            icon
          )}
          {badge !== undefined && badge !== null && (
            <span className={styles.bottomNavBadge}>{badge}</span>
          )}
        </div>
        <span className={styles.bottomNavLabel}>{label}</span>
      </button>
    );
  }
);

BottomNavigationItem.displayName = 'BottomNavigationItem';

export interface BottomNavItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: string | number;
}

export interface BottomNavigationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'onChange'
> {
  value?: string;
  onChange?: (value: string) => void;
  items?: BottomNavItemConfig[];
  children?: React.ReactNode;
}

export const BottomNavigation = React.forwardRef<
  HTMLElement,
  BottomNavigationProps
>(({ value, onChange, items, children, className = '', ...props }, ref) => {
  return (
    <nav
      ref={ref}
      role="tablist"
      aria-label="Mobile Navigation"
      className={`${styles.bottomNavigation} ${className}`.trim()}
      {...props}
    >
      {items
        ? items.map((item) => (
            <BottomNavigationItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              activeIcon={item.activeIcon}
              badge={item.badge}
              isActive={value === item.id}
              onClick={() => onChange?.(item.id)}
            />
          ))
        : children}
    </nav>
  );
});

BottomNavigation.displayName = 'BottomNavigation';

/* ==========================================================================
   2. NavigationRail (Adaptive Tablet & Desktop Rail - 80px Width)
   ========================================================================== */

export interface NavigationRailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  icon: React.ReactNode;
  title?: string;
  badge?: string | number;
  isActive?: boolean;
}

export const NavigationRailItem = React.forwardRef<
  HTMLButtonElement,
  NavigationRailItemProps
>(
  (
    {
      id,
      icon,
      title,
      badge,
      isActive = false,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        title={title}
        aria-label={title || id}
        aria-current={isActive ? 'page' : undefined}
        data-testid={`rail-item-${id}`}
        className={`${styles.railItem} ${
          isActive ? styles.railItemActive : ''
        } ${className}`.trim()}
        onClick={onClick}
        {...props}
      >
        {icon}
        {badge !== undefined && badge !== null && (
          <span className={styles.railItemBadge}>{badge}</span>
        )}
      </button>
    );
  }
);

NavigationRailItem.displayName = 'NavigationRailItem';

export interface NavigationRailItemConfig {
  id: string;
  icon: React.ReactNode;
  title?: string;
  badge?: string | number;
}

export interface NavigationRailProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'onChange'
> {
  theme?: 'dark' | 'light';
  orientation?: 'vertical' | 'horizontal';
  isDocked?: boolean;
  brand?: React.ReactNode;
  brandTitle?: string;
  footer?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  items?: NavigationRailItemConfig[];
  children?: React.ReactNode;
}

export const NavigationRail = React.forwardRef<
  HTMLElement,
  NavigationRailProps
>(
  (
    {
      theme = 'dark',
      orientation = 'vertical',
      isDocked = false,
      brand,
      brandTitle,
      footer,
      value,
      onChange,
      items,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const themeClass =
      theme === 'dark' ? styles.navigationRailDark : styles.navigationRailLight;
    const orientationClass =
      orientation === 'horizontal' ? styles.navigationRailHorizontal : '';
    const dockedClass = isDocked ? styles.navigationRailDocked : '';

    return (
      <aside
        ref={ref}
        aria-label="Navigation Rail"
        className={`${styles.navigationRail} ${themeClass} ${orientationClass} ${dockedClass} ${className}`.trim()}
        {...props}
      >
        {brand && (
          <div className={styles.railBrandSlot}>
            {typeof brand === 'string' ? (
              <div className={styles.railBrandIcon}>{brand}</div>
            ) : (
              brand
            )}
            {brandTitle && orientation === 'horizontal' && (
              <span className={styles.railBrandTitle}>{brandTitle}</span>
            )}
          </div>
        )}

        <div className={styles.railItemsStack}>
          {items
            ? items.map((item) => (
                <NavigationRailItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  title={item.title}
                  badge={item.badge}
                  isActive={value === item.id}
                  onClick={() => onChange?.(item.id)}
                />
              ))
            : children}
        </div>

        {footer && <div className={styles.railFooterSlot}>{footer}</div>}
      </aside>
    );
  }
);

NavigationRail.displayName = 'NavigationRail';

/* ==========================================================================
   3. Breadcrumb & MobileWayfinding (Desktop & Mobile Patterns)
   ========================================================================== */

export interface BreadcrumbItemConfig {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'subtle' | 'plain';
  separator?: React.ReactNode;
  items?: BreadcrumbItemConfig[];
  children?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      variant = 'primary',
      separator = '/',
      items,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    let variantClass = styles.breadcrumbPrimary;
    if (variant === 'subtle') variantClass = styles.breadcrumbSubtle;
    if (variant === 'plain') variantClass = styles.breadcrumbPlain;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb Trail"
        className={`${styles.breadcrumb} ${variantClass} ${className}`.trim()}
        {...props}
      >
        <ol className={styles.breadcrumbList}>
          {items
            ? items.map((item, index) => {
                const isLast = index === items.length - 1;
                const isCurrent = item.isCurrent ?? isLast;

                return (
                  <li key={item.id} className={styles.breadcrumbItem}>
                    {isCurrent ? (
                      <span
                        aria-current="page"
                        className={styles.breadcrumbCurrent}
                      >
                        {item.icon}
                        {item.label}
                      </span>
                    ) : (
                      <a
                        href={item.href || '#'}
                        className={styles.breadcrumbLink}
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    )}
                    {!isLast && (
                      <span
                        className={styles.breadcrumbSeparator}
                        aria-hidden="true"
                      >
                        {separator}
                      </span>
                    )}
                  </li>
                );
              })
            : children}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export interface MobileWayfindingStep {
  id: string;
  label: string;
  href?: string;
}

export interface MobileWayfindingProps extends React.HTMLAttributes<HTMLDivElement> {
  parentLabel: string;
  onBack?: () => void;
  currentLabel: string;
  path?: MobileWayfindingStep[];
  currentStepIndex?: number;
  totalSteps?: number;
  onStepClick?: (step: MobileWayfindingStep, index: number) => void;
}

export const MobileWayfinding = React.forwardRef<
  HTMLDivElement,
  MobileWayfindingProps
>(
  (
    {
      parentLabel,
      onBack,
      currentLabel,
      path,
      currentStepIndex,
      totalSteps,
      onStepClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsPopoverOpen(false);
        }
      };
      if (isPopoverOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isPopoverOpen]);

    const stepsTotal = totalSteps || (path ? path.length : 1);
    const stepCurrent =
      currentStepIndex !== undefined ? currentStepIndex : stepsTotal;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={`${styles.mobileWayfinding} ${className}`.trim()}
        {...props}
      >
        <div className={styles.wayfindingHeaderRow}>
          {/* Back Step Pill */}
          <button
            type="button"
            className={styles.wayfindingBackBtn}
            onClick={onBack}
            aria-label={`Go back to ${parentLabel}`}
          >
            <ChevronLeftIcon className={styles.wayfindingBackIcon} size={14} />
            <span>{parentLabel}</span>
          </button>

          {/* Current Node Popover Trigger */}
          <button
            type="button"
            className={styles.wayfindingCurrentTrigger}
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            aria-expanded={isPopoverOpen}
            aria-haspopup="true"
          >
            <span className={styles.wayfindingCurrentLabel}>
              {currentLabel}
            </span>
            <ChevronDownIcon
              className={`${styles.wayfindingCurrentIcon} ${
                isPopoverOpen ? styles.wayfindingCurrentIconOpen : ''
              }`}
              size={14}
            />
          </button>
        </div>

        {/* Mini Path Drawer / Popover */}
        {isPopoverOpen && path && path.length > 0 && (
          <div className={styles.wayfindingPopover}>
            <div className={styles.wayfindingPopoverMeta}>
              <span>
                Current Hierarchy Path ({stepCurrent} of {stepsTotal})
              </span>
              <span className={styles.wayfindingPopoverAction}>
                Tap to Jump
              </span>
            </div>
            <div className={styles.wayfindingPathList}>
              {path.map((step, idx) => {
                const isStepActive = idx === stepCurrent - 1;
                return (
                  <button
                    key={step.id}
                    type="button"
                    className={`${styles.wayfindingPathItem} ${
                      isStepActive ? styles.wayfindingPathItemActive : ''
                    }`}
                    onClick={() => {
                      onStepClick?.(step, idx);
                      setIsPopoverOpen(false);
                    }}
                  >
                    <span>
                      {idx + 1}. {step.label}
                    </span>
                    {isStepActive && <CheckIcon size={12} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);

MobileWayfinding.displayName = 'MobileWayfinding';

/* ==========================================================================
   4. AppNavbar & NavigationMenu (Desktop & Mobile Responsive Architecture)
   ========================================================================== */

export interface NavigationSubItemConfig {
  id: string;
  label: string;
  href?: string;
  badge?: string | number;
  onClick?: () => void;
}

export interface NavigationMenuItemConfig {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  subItems?: NavigationSubItemConfig[];
  onClick?: () => void;
}

export interface AppNavbarProps extends React.HTMLAttributes<HTMLElement> {
  brandLogo?: React.ReactNode;
  brandName?: React.ReactNode;
  brandSubtitle?: React.ReactNode;
  brandHref?: string;
  menuItems?: NavigationMenuItemConfig[];
  activeItemId?: string;
  onItemClick?: (id: string) => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const AppNavbar = React.forwardRef<HTMLElement, AppNavbarProps>(
  (
    {
      brandLogo,
      brandName,
      brandSubtitle,
      brandHref = '#',
      menuItems,
      activeItemId,
      onItemClick,
      actions,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) {
          setOpenDropdownId(null);
        }
      };
      if (openDropdownId) {
        document.addEventListener('mousedown', handleOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [openDropdownId]);

    return (
      <header
        ref={(node) => {
          navRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={`${styles.appNavbar} ${className}`.trim()}
        {...props}
      >
        <div className={styles.navbarLeft}>
          {/* Brand */}
          <a href={brandHref} className={styles.navbarBrand}>
            {brandLogo && (
              <div className={styles.navbarBrandLogo}>{brandLogo}</div>
            )}
            {(brandName || brandSubtitle) && (
              <div className={styles.navbarBrandTitles}>
                {brandName && (
                  <span className={styles.navbarBrandName}>{brandName}</span>
                )}
                {brandSubtitle && (
                  <span className={styles.navbarBrandSubtitle}>
                    {brandSubtitle}
                  </span>
                )}
              </div>
            )}
          </a>

          {/* Desktop Navigation Menu */}
          {menuItems && menuItems.length > 0 && (
            <ul className={styles.navbarMenu}>
              {menuItems.map((item) => {
                const isActive = item.isActive ?? activeItemId === item.id;
                const hasSubmenu = item.subItems && item.subItems.length > 0;
                const isDropdownOpen = openDropdownId === item.id;

                return (
                  <li key={item.id} className={styles.navbarMenuItem}>
                    <button
                      type="button"
                      className={`${styles.navbarMenuLink} ${
                        isActive ? styles.navbarMenuLinkActive : ''
                      }`}
                      onClick={() => {
                        if (hasSubmenu) {
                          setOpenDropdownId(isDropdownOpen ? null : item.id);
                        } else {
                          item.onClick?.();
                          onItemClick?.(item.id);
                        }
                      }}
                      aria-expanded={hasSubmenu ? isDropdownOpen : undefined}
                      aria-haspopup={hasSubmenu ? 'true' : undefined}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {hasSubmenu && <ChevronDownIcon size={14} />}
                    </button>

                    {/* Submenu Dropdown */}
                    {hasSubmenu && isDropdownOpen && (
                      <div className={styles.navbarDropdown}>
                        {item.subItems!.map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            className={styles.navbarDropdownItem}
                            onClick={() => {
                              sub.onClick?.();
                              onItemClick?.(sub.id);
                              setOpenDropdownId(null);
                            }}
                          >
                            <span>{sub.label}</span>
                            {sub.badge !== undefined && (
                              <span className={styles.railItemBadge}>
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {children}
        </div>

        {/* Right Actions Slot & Mobile Trigger */}
        <div className={styles.navbarRight}>
          {actions}

          {/* Mobile Menu Toggle Button */}
          {menuItems && menuItems.length > 0 && (
            <button
              type="button"
              className={styles.navbarMobileToggle}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={18} />
              ) : (
                <MenuIcon size={18} />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && menuItems && menuItems.length > 0 && (
          <div
            className={styles.navbarMobileDrawer}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={styles.navbarMobileDrawerContent}
              onClick={(e) => e.stopPropagation()}
            >
              {menuItems.map((item) => {
                const isActive = item.isActive ?? activeItemId === item.id;
                return (
                  <div key={item.id}>
                    <button
                      type="button"
                      className={`${styles.navbarMenuLink} ${
                        isActive ? styles.navbarMenuLinkActive : ''
                      }`}
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                      onClick={() => {
                        item.onClick?.();
                        onItemClick?.(item.id);
                        if (!item.subItems) setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                    {item.subItems && (
                      <div
                        style={{
                          paddingLeft: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          marginTop: '4px',
                        }}
                      >
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            className={styles.navbarDropdownItem}
                            onClick={() => {
                              sub.onClick?.();
                              onItemClick?.(sub.id);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>
    );
  }
);

AppNavbar.displayName = 'AppNavbar';
