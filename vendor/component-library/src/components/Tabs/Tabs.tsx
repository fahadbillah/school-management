import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from 'react';
import styles from './Tabs.module.css';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  CheckIcon,
} from '../common/Icons';

export type TabsVariant = 'pill' | 'underline' | 'segmented';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  tabs: TabItem[];
  activeTab?: string;
  defaultActiveTab?: string;
  onChange?: (id: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  scrollable?: boolean;
  showScrollButtons?: boolean;
  maxVisibleTabs?: number;
  moreLabel?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeTab,
      defaultActiveTab,
      onChange,
      variant = 'pill',
      size = 'md',
      fullWidth = false,
      scrollable = false,
      showScrollButtons = true,
      maxVisibleTabs,
      moreLabel = 'More',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = useState<string>(
      activeTab || defaultActiveTab || tabs[0]?.id || ''
    );

    const currentActive = activeTab !== undefined ? activeTab : internalActive;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const moreMenuRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    // Compute visible tabs vs overflow tabs
    const hasMoreOverflow =
      typeof maxVisibleTabs === 'number' &&
      maxVisibleTabs > 0 &&
      tabs.length > maxVisibleTabs;

    const visibleTabs = hasMoreOverflow ? tabs.slice(0, maxVisibleTabs) : tabs;

    const overflowTabs = hasMoreOverflow ? tabs.slice(maxVisibleTabs) : [];

    const isCurrentInOverflow = overflowTabs.some(
      (t) => t.id === currentActive
    );

    // Close More menu on outside click
    useEffect(() => {
      if (!isMoreOpen) return;

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          moreMenuRef.current &&
          !moreMenuRef.current.contains(e.target as Node)
        ) {
          setIsMoreOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [isMoreOpen]);

    // Check scroll boundaries
    const checkScrollLimits = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container || !scrollable) {
        setCanScrollLeft(false);
        setCanScrollRight(false);
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }, [scrollable]);

    useEffect(() => {
      if (!scrollable) return;

      const container = scrollContainerRef.current;
      if (!container) return;

      checkScrollLimits();

      container.addEventListener('scroll', checkScrollLimits, {
        passive: true,
      });
      window.addEventListener('resize', checkScrollLimits);

      return () => {
        container.removeEventListener('scroll', checkScrollLimits);
        window.removeEventListener('resize', checkScrollLimits);
      };
    }, [scrollable, checkScrollLimits, visibleTabs]);

    // Scroll active tab into view when activeTab changes
    useEffect(() => {
      if (!scrollable) return;
      const activeEl = tabRefs.current.get(currentActive);
      const container = scrollContainerRef.current;
      if (activeEl && container) {
        const activeRect = activeEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (activeRect.left < containerRect.left) {
          container.scrollBy({
            left: activeRect.left - containerRect.left - 16,
            behavior: 'smooth',
          });
        } else if (activeRect.right > containerRect.right) {
          container.scrollBy({
            left: activeRect.right - containerRect.right + 16,
            behavior: 'smooth',
          });
        }
      }
    }, [currentActive, scrollable]);

    const handleTabClick = (id: string, disabled?: boolean) => {
      if (disabled) return;
      if (activeTab === undefined) {
        setInternalActive(id);
      }
      setIsMoreOpen(false);
      onChange?.(id);
    };

    // WAI-ARIA Keyboard Navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      if (enabledTabs.length === 0) return;

      const currentIndex = enabledTabs.findIndex((t) => t.id === currentActive);
      let targetIndex = -1;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        targetIndex =
          currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        targetIndex =
          currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        targetIndex = enabledTabs.length - 1;
      }

      if (targetIndex >= 0) {
        const targetTab = enabledTabs[targetIndex];
        if (targetTab) {
          handleTabClick(targetTab.id);
          const btn = tabRefs.current.get(targetTab.id);
          btn?.focus();
        }
      }
    };

    const scrollByAmount = (offset: number) => {
      const container = scrollContainerRef.current;
      if (container) {
        container.scrollBy({ left: offset, behavior: 'smooth' });
      }
    };

    const containerClasses = [
      styles.container,
      canScrollLeft && styles.hasScrollLeft,
      canScrollRight && styles.hasScrollRight,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const listClasses = [
      styles.tabList,
      styles[`variant-${variant}`],
      fullWidth ? styles.fullWidth : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div className={styles.navWrapper}>
          {scrollable && showScrollButtons && canScrollLeft && (
            <button
              type="button"
              className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
              aria-label="Scroll tabs left"
              onClick={() => scrollByAmount(-200)}
            >
              <ChevronLeftIcon size={16} />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className={scrollable ? styles.scrollContainer : undefined}
          >
            <div
              role="tablist"
              className={listClasses}
              onKeyDown={handleKeyDown}
            >
              {visibleTabs.map((tab) => {
                const isActive = tab.id === currentActive;
                const tabClasses = [
                  styles.tab,
                  styles[`size-${size}`],
                  isActive ? styles.tabActive : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      if (node) {
                        tabRefs.current.set(tab.id, node);
                      } else {
                        tabRefs.current.delete(tab.id);
                      }
                    }}
                    role="tab"
                    type="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    disabled={tab.disabled}
                    onClick={() => handleTabClick(tab.id, tab.disabled)}
                    className={tabClasses}
                  >
                    {tab.icon && <span>{tab.icon}</span>}
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && (
                      <span className={styles.badge}>{tab.badge}</span>
                    )}
                  </button>
                );
              })}

              {/* More Overflow Dropdown Trigger & Popover */}
              {hasMoreOverflow && (
                <div ref={moreMenuRef} className={styles.moreWrapper}>
                  <button
                    type="button"
                    className={[
                      styles.moreButton,
                      styles[`size-${size}`],
                      isCurrentInOverflow ? styles.moreButtonActive : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-haspopup="true"
                    aria-expanded={isMoreOpen}
                    aria-label="More navigation tabs"
                    onClick={() => setIsMoreOpen((prev) => !prev)}
                  >
                    <MoreHorizontalIcon size={16} />
                    <span>{moreLabel}</span>
                    <ChevronDownIcon size={14} />
                  </button>

                  {isMoreOpen && (
                    <div className={styles.moreMenu} role="menu">
                      {overflowTabs.map((tab) => {
                        const isActive = tab.id === currentActive;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="menuitem"
                            disabled={tab.disabled}
                            className={[
                              styles.moreMenuItem,
                              isActive ? styles.moreMenuItemActive : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            onClick={() => handleTabClick(tab.id, tab.disabled)}
                          >
                            <span className={styles.moreMenuItemLeft}>
                              {tab.icon && <span>{tab.icon}</span>}
                              <span>{tab.label}</span>
                            </span>
                            {isActive && <CheckIcon size={14} />}
                            {!isActive && tab.badge !== undefined && (
                              <span className={styles.badge}>{tab.badge}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {scrollable && showScrollButtons && canScrollRight && (
            <button
              type="button"
              className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
              aria-label="Scroll tabs right"
              onClick={() => scrollByAmount(200)}
            >
              <ChevronRightIcon size={16} />
            </button>
          )}
        </div>
        {children}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  tabId: string;
  activeTabId: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tabId, activeTabId, className, children, ...props }, ref) => {
    if (tabId !== activeTabId) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${tabId}`}
        aria-labelledby={`tab-${tabId}`}
        tabIndex={0}
        className={`${styles.panel} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
