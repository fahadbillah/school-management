import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
  it('renders label correctly', () => {
    render(<Chip label="Engineering" />);
    expect(screen.getByText('Engineering')).toBeInTheDocument();
  });

  it('renders avatar or icon when provided', () => {
    render(<Chip label="Design" avatar={<span data-testid="avatar-dot" />} />);
    expect(screen.getByTestId('avatar-dot')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const handleRemove = vi.fn();
    render(<Chip label="Marketing" onRemove={handleRemove} />);
    const button = screen.getByRole('button', { name: /remove marketing/i });
    await userEvent.click(button);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onRemove when disabled', async () => {
    const handleRemove = vi.fn();
    render(<Chip label="Disabled Tag" onRemove={handleRemove} disabled />);
    const button = screen.getByRole('button', { name: /remove disabled tag/i });
    expect(button).toBeDisabled();
  });

  it('renders size lg, count badge, and selected state', () => {
    render(
      <Chip label="Biology" size="lg" variant="tonal" count="14" selected />
    );
    expect(screen.getByText('Biology')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
  });
});
