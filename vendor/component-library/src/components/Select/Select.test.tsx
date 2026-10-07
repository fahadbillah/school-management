import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const sampleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'teacher', label: 'Teacher / Faculty' },
  { value: 'student', label: 'Student' },
];

describe('Select', () => {
  it('renders select with label and options', () => {
    render(<Select label="User Role" options={sampleOptions} />);
    expect(screen.getByLabelText(/user role/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('admin');
  });

  it('handles value changes', async () => {
    const handleChange = vi.fn();
    render(
      <Select
        label="User Role"
        options={sampleOptions}
        onChange={handleChange}
      />
    );
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'student');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('student');
  });

  it('displays error message and marks aria-invalid', () => {
    render(
      <Select
        label="User Role"
        options={sampleOptions}
        errorMessage="Role is required."
      />
    );
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Role is required.');
  });
});
