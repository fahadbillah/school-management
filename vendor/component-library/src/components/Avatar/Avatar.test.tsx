import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials when name is passed and no image is provided', () => {
    render(<Avatar name="Eleanor Vance" />);
    expect(screen.getByText('EV')).toBeInTheDocument();
  });

  it('renders single word initials correctly', () => {
    render(<Avatar name="Admin" />);
    expect(screen.getByText('AD')).toBeInTheDocument();
  });

  it('renders status dot when status prop is passed', () => {
    const { container } = render(<Avatar name="John Doe" status="online" />);
    expect(
      container.querySelector('[aria-label="Status: online"]')
    ).toBeInTheDocument();
  });
});
