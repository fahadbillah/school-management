import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, ComboboxOption } from './Combobox';

const sampleOptions: ComboboxOption[] = [
  {
    value: 'bio-101',
    label: 'Biology 101: Cell Structure',
    group: 'Courses & Modules',
    badge: 'CRN-4021',
  },
  {
    value: 'ap-bio',
    label: 'AP Biology Honors Lab',
    group: 'Courses & Modules',
    badge: 'CRN-4029',
  },
  {
    value: 'dr-vance',
    label: 'Dr. Robert Vance',
    group: 'Faculty Members',
    badge: 'Lead Faculty',
  },
];

describe('Combobox', () => {
  it('renders input trigger with placeholder', () => {
    render(
      <Combobox
        label="Quick Entity Finder"
        placeholder="Search courses or faculty..."
        options={sampleOptions}
      />
    );
    expect(screen.getByText('Quick Entity Finder')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search courses or faculty...')
    ).toBeInTheDocument();
  });

  it('filters results and triggers selection', async () => {
    const handleChange = vi.fn();
    render(<Combobox options={sampleOptions} onChange={handleChange} />);

    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'Bio');

    expect(screen.getByText(/Cell Structure/i)).toBeInTheDocument();
    expect(screen.getByText(/Honors Lab/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Cell Structure/i));
    expect(handleChange).toHaveBeenCalledWith('bio-101', sampleOptions[0]);
  });

  it('displays empty fallback when no matching records found', async () => {
    render(<Combobox options={sampleOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'NonExistentXYZ');

    expect(screen.getByText(/No matching records found/i)).toBeInTheDocument();
  });
});
