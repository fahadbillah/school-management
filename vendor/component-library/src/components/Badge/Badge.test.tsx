import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders badge label correctly', () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders with dot indicator when withDot is true', () => {
    const { container } = render(
      <Badge variant="warning" withDot>
        Pending
      </Badge>
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Badge variant="danger" className="custom-class">
        Failed
      </Badge>
    );
    expect(screen.getByText('Failed').parentElement).toHaveClass(
      'custom-class'
    );
  });
});
