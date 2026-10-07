import React from 'react';

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * PageShell provides the outer full-viewport flex column shell that pins
 * footers to the bottom and applies base background styling.
 */
export const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`ui-page-shell ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

PageShell.displayName = 'PageShell';

export type ContainerMaxWidth = 'standard' | 'narrow' | 'compact' | 'full';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerMaxWidth;
  as?: 'div' | 'main' | 'section' | 'article' | 'header' | 'footer' | 'nav';
  children?: React.ReactNode;
}

/**
 * PageContainer provides horizontal guardrail boundary with responsive
 * padding (16px mobile, 24px tablet, 32px desktop) and max-width clamping.
 */
export const PageContainer = React.forwardRef<HTMLElement, PageContainerProps>(
  (
    { maxWidth = 'standard', as = 'div', className = '', children, ...props },
    ref
  ) => {
    const Component = as as any;
    const widthClass = `ui-container--${maxWidth}`;

    return (
      <Component
        ref={ref}
        className={`ui-container ${widthClass} ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export interface PageBodyProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'main' | 'div' | 'section';
  children?: React.ReactNode;
}

/**
 * PageBody provides the flex-1 auto expandable content slot between
 * header and footer with standardized vertical gutter rhythms (24px/32px).
 */
export const PageBody = React.forwardRef<HTMLElement, PageBodyProps>(
  ({ as = 'main', className = '', children, ...props }, ref) => {
    const Component = as as any;

    return (
      <Component
        ref={ref}
        className={`ui-page-body ${className}`.trim()}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

PageBody.displayName = 'PageBody';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  containerMaxWidth?: ContainerMaxWidth;
  children?: React.ReactNode;
}

/**
 * PageHeader renders a sticky top header bar with 64px height contract.
 */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    { containerMaxWidth = 'standard', className = '', children, ...props },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={`ui-page-header ${className}`.trim()}
        {...props}
      >
        <PageContainer maxWidth={containerMaxWidth}>
          <div className="ui-page-header__inner">{children}</div>
        </PageContainer>
      </header>
    );
  }
);

PageHeader.displayName = 'PageHeader';

export interface SubNavStripProps extends React.HTMLAttributes<HTMLDivElement> {
  containerMaxWidth?: ContainerMaxWidth;
  children?: React.ReactNode;
}

/**
 * SubNavStrip provides a 48px high secondary navigation band for back triggers,
 * breadcrumbs, and route metadata pills (Stitch Variant B).
 */
export const SubNavStrip = React.forwardRef<HTMLDivElement, SubNavStripProps>(
  (
    { containerMaxWidth = 'standard', className = '', children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`ui-subnav-strip ${className}`.trim()}
        {...props}
      >
        <PageContainer maxWidth={containerMaxWidth}>
          <div className="ui-subnav-strip__inner">{children}</div>
        </PageContainer>
      </div>
    );
  }
);

SubNavStrip.displayName = 'SubNavStrip';

export interface PageHeroProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'title'
> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  containerMaxWidth?: ContainerMaxWidth;
}

/**
 * PageHero provides a standardized page title banner with subtitle and CTA action group.
 */
export const PageHero = React.forwardRef<HTMLElement, PageHeroProps>(
  (
    {
      title,
      subtitle,
      actions,
      containerMaxWidth = 'standard',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={`ui-page-hero ${className}`.trim()}
        {...props}
      >
        <PageContainer maxWidth={containerMaxWidth}>
          <div className="ui-page-hero__inner">
            <div className="ui-page-hero__title-group">
              <h1 className="ui-page-hero__title">{title}</h1>
              {subtitle && <p className="ui-page-hero__subtitle">{subtitle}</p>}
            </div>
            {actions && <div className="ui-page-hero__actions">{actions}</div>}
          </div>
        </PageContainer>
      </section>
    );
  }
);

PageHero.displayName = 'PageHero';

export interface CardSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * CardSlot renders a standardized white wireframe or card container with
 * 12px border radius, elevation shadow, and responsive padding.
 */
export const CardSlot = React.forwardRef<HTMLDivElement, CardSlotProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`ui-card-slot ${className}`.trim()} {...props}>
        {children}
      </div>
    );
  }
);

CardSlot.displayName = 'CardSlot';

export interface PageFooterProps extends React.HTMLAttributes<HTMLElement> {
  containerMaxWidth?: ContainerMaxWidth;
  children?: React.ReactNode;
}

/**
 * PageFooter provides an institutional footer pinned to the bottom of the viewport.
 */
export const PageFooter = React.forwardRef<HTMLElement, PageFooterProps>(
  (
    { containerMaxWidth = 'standard', className = '', children, ...props },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={`ui-page-footer ${className}`.trim()}
        {...props}
      >
        <PageContainer maxWidth={containerMaxWidth}>
          <div className="ui-page-footer__inner">{children}</div>
        </PageContainer>
      </footer>
    );
  }
);

PageFooter.displayName = 'PageFooter';
