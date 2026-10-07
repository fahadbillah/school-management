import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders switch toggle with label', () => {
    render(<Switch label="Enable 2-Step Verification" />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(screen.getByText('Enable 2-Step Verification')).toBeInTheDocument();
  });

  it('toggles value on user interaction', async () => {
    const handleChange = vi.fn();
    render(<Switch label="Auto-sync" onChange={handleChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();

    await userEvent.click(toggle);
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects disabled state', () => {
    render(<Switch label="Locked Setting" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
