import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders input with label and helper text', () => {
    render(
      <Input
        label="Email Address"
        helperText="We will never share your email."
      />
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByText('We will never share your email.')
    ).toBeInTheDocument();
  });

  it('handles user text entry', async () => {
    const handleChange = vi.fn();
    render(<Input label="Username" onChange={handleChange} />);
    const input = screen.getByLabelText(/username/i);
    await userEvent.type(input, 'testuser');
    expect(input).toHaveValue('testuser');
  });

  it('renders error message and marks aria-invalid', () => {
    render(
      <Input
        label="Password"
        errorMessage="Password must be at least 8 characters."
      />
    );
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Password must be at least 8 characters.'
    );
  });

  it('disables input when disabled prop is provided', () => {
    render(<Input label="Disabled Field" disabled />);
    expect(screen.getByLabelText(/disabled field/i)).toBeDisabled();
  });
});
