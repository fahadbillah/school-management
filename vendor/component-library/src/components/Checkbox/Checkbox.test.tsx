import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label and description', () => {
    render(
      <Checkbox
        label="Enable Notifications"
        description="Receive daily administrative digests."
      />
    );
    expect(screen.getByLabelText(/enable notifications/i)).toBeInTheDocument();
    expect(
      screen.getByText('Receive daily administrative digests.')
    ).toBeInTheDocument();
  });

  it('handles user check toggling', async () => {
    const handleChange = vi.fn();
    render(<Checkbox label="I agree" onChange={handleChange} />);
    const checkbox = screen.getByLabelText(/i agree/i);
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders disabled state correctly', () => {
    render(<Checkbox label="Locked setting" disabled />);
    expect(screen.getByLabelText(/locked setting/i)).toBeDisabled();
  });
});
