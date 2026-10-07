import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders textarea with label and helper text', () => {
    render(
      <Textarea
        label="Academic Notes"
        helperText="Add any remarks for the term."
      />
    );
    expect(screen.getByLabelText(/academic notes/i)).toBeInTheDocument();
    expect(
      screen.getByText('Add any remarks for the term.')
    ).toBeInTheDocument();
  });

  it('handles user typing and character count', async () => {
    const handleChange = vi.fn();
    render(
      <Textarea
        label="Feedback"
        maxLength={100}
        showCharCount
        onChange={handleChange}
      />
    );
    const textarea = screen.getByLabelText(/feedback/i);
    await userEvent.type(textarea, 'Great progress');
    expect(textarea).toHaveValue('Great progress');
    expect(screen.getByText('14 / 100')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <Textarea label="Remarks" errorMessage="Remarks cannot be empty." />
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Remarks cannot be empty.'
    );
  });
});
