import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  PageShell,
  PageContainer,
  PageBody,
  PageHeader,
  SubNavStrip,
  PageHero,
  CardSlot,
  PageFooter,
} from './Layout';

describe('Layout Components', () => {
  it('renders PageShell with full height class and children', () => {
    const { container } = render(
      <PageShell data-testid="shell">
        <div>Content</div>
      </PageShell>
    );

    const shell = screen.getByTestId('shell');
    expect(shell).toBeInTheDocument();
    expect(shell).toHaveClass('ui-page-shell');
    expect(container).toHaveTextContent('Content');
  });

  it('renders PageContainer with appropriate max-width variants', () => {
    const { rerender } = render(
      <PageContainer maxWidth="standard" data-testid="container">
        Content
      </PageContainer>
    );

    let containerEl = screen.getByTestId('container');
    expect(containerEl).toHaveClass('ui-container');
    expect(containerEl).toHaveClass('ui-container--standard');

    rerender(
      <PageContainer maxWidth="narrow" data-testid="container">
        Content
      </PageContainer>
    );
    containerEl = screen.getByTestId('container');
    expect(containerEl).toHaveClass('ui-container--narrow');

    rerender(
      <PageContainer maxWidth="compact" data-testid="container">
        Content
      </PageContainer>
    );
    containerEl = screen.getByTestId('container');
    expect(containerEl).toHaveClass('ui-container--compact');

    rerender(
      <PageContainer maxWidth="full" data-testid="container">
        Content
      </PageContainer>
    );
    containerEl = screen.getByTestId('container');
    expect(containerEl).toHaveClass('ui-container--full');
  });

  it('renders PageContainer as custom semantic HTML element', () => {
    render(
      <PageContainer as="main" data-testid="main-container">
        Main content
      </PageContainer>
    );

    const el = screen.getByTestId('main-container');
    expect(el.tagName).toBe('MAIN');
  });

  it('renders PageBody and applies ui-page-body class', () => {
    render(<PageBody data-testid="body">Body</PageBody>);
    const body = screen.getByTestId('body');
    expect(body).toHaveClass('ui-page-body');
    expect(body.tagName).toBe('MAIN');
  });

  it('renders PageHeader and SubNavStrip with inner containers', () => {
    render(
      <>
        <PageHeader data-testid="header">Header Content</PageHeader>
        <SubNavStrip data-testid="subnav">Subnav Content</SubNavStrip>
      </>
    );

    const header = screen.getByTestId('header');
    expect(header).toHaveClass('ui-page-header');
    expect(header).toHaveTextContent('Header Content');

    const subnav = screen.getByTestId('subnav');
    expect(subnav).toHaveClass('ui-subnav-strip');
    expect(subnav).toHaveTextContent('Subnav Content');
  });

  it('renders PageHero with title, subtitle, and action buttons', () => {
    render(
      <PageHero
        title="Course Master"
        subtitle="Section CRN 4082 • Academic Term Fall 2025"
        actions={<button>Export</button>}
        data-testid="hero"
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Course Master'
    );
    expect(
      screen.getByText('Section CRN 4082 • Academic Term Fall 2025')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
  });

  it('renders CardSlot and PageFooter correctly', () => {
    render(
      <>
        <CardSlot data-testid="slot">Card Body</CardSlot>
        <PageFooter data-testid="footer">Footer Info</PageFooter>
      </>
    );

    expect(screen.getByTestId('slot')).toHaveClass('ui-card-slot');
    expect(screen.getByTestId('footer')).toHaveClass('ui-page-footer');
  });

  it('forwards refs cleanly across layout components', () => {
    const shellRef = React.createRef<HTMLDivElement>();
    const containerRef = React.createRef<HTMLElement>();

    render(
      <PageShell ref={shellRef}>
        <PageContainer ref={containerRef}>Content</PageContainer>
      </PageShell>
    );

    expect(shellRef.current).toBeInstanceOf(HTMLDivElement);
    expect(containerRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
