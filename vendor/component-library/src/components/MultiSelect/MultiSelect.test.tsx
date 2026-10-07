import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect, MultiSelectOption } from './MultiSelect';

const mockOptions: MultiSelectOption[] = [
  { value: '1', label: 'Aria Thorne', description: 'aria.thorne@academy.edu' },
  { value: '2', label: 'Marcus Vance', description: 'marcus.v@academy.edu' },
  { value: '3', label: 'Elena Rostova', description: 'elena.r@academy.edu' },
];

describe('MultiSelect', () => {
  it('renders placeholder and label', () => {
    render(
      <MultiSelect
        label="Select Students"
        placeholder="Search roster..."
        options={mockOptions}
      />
    );
    expect(screen.getByText('Select Students')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search roster...')).toBeInTheDocument();
  });

  it('opens options list when clicked and selects multiple items', async () => {
    const handleChange = vi.fn();
    render(<MultiSelect options={mockOptions} onChange={handleChange} />);

    // Click trigger to open menu
    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(screen.getByText('Aria Thorne')).toBeInTheDocument();
    expect(screen.getByText('Marcus Vance')).toBeInTheDocument();

    // Click first option
    await userEvent.click(screen.getByText('Aria Thorne'));
    expect(handleChange).toHaveBeenCalledWith(['1'], [mockOptions[0]]);

    // Click second option
    await userEvent.click(screen.getByText('Marcus Vance'));
    expect(handleChange).toHaveBeenCalledWith(
      ['1', '2'],
      [mockOptions[0], mockOptions[1]]
    );
  });

  it('removes item when chip remove button is clicked', async () => {
    const handleChange = vi.fn();
    render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['1', '2']}
        onChange={handleChange}
      />
    );

    const removeBtn = screen.getByRole('button', {
      name: /remove aria thorne/i,
    });
    await userEvent.click(removeBtn);
    expect(handleChange).toHaveBeenCalledWith(['2'], [mockOptions[1]]);
  });

  it('renders chips with specified chipShape (rounded or pill)', () => {
    const { container, rerender } = render(
      <MultiSelect
        options={mockOptions}
        defaultValue={['1']}
        chipShape="rounded"
      />
    );
    const chip = container.querySelector('[role="status"]');
    expect(chip?.className).toMatch(/rounded/);

    rerender(
      <MultiSelect
        options={mockOptions}
        defaultValue={['1']}
        chipShape="pill"
      />
    );
    const pillChip = container.querySelector('[role="status"]');
    expect(pillChip?.className).toMatch(/pill/);
  });
});
