import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown, DropdownOption } from './Dropdown';

const mockOptions: DropdownOption[] = [
  {
    value: 'el-1',
    label: 'Eleanor Vance',
    description: 'Faculty Chair • Physics',
    avatar: { name: 'Eleanor Vance', status: 'online' },
  },
  {
    value: 'ms-2',
    label: 'Marcus Sterling',
    description: 'Student • Grade 11',
    avatar: { name: 'Marcus Sterling', status: 'away' },
  },
  {
    value: 'dis-3',
    label: 'Disabled User',
    disabled: true,
  },
];

describe('Dropdown', () => {
  it('renders closed by default and displays placeholder', () => {
    render(
      <Dropdown
        label="Assign Lead"
        options={mockOptions}
        placeholder="Pick someone..."
      />
    );
    expect(screen.getByText('Assign Lead')).toBeInTheDocument();
    expect(screen.getByText('Pick someone...')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens options list when clicked and shows avatar initials', async () => {
    render(<Dropdown label="Select Member" options={mockOptions} />);
    const trigger = screen.getByRole('button');
    await userEvent.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Eleanor Vance')).toBeInTheDocument();
    expect(screen.getByText('Faculty Chair • Physics')).toBeInTheDocument();
    expect(screen.getByText('EV')).toBeInTheDocument();
  });

  it('selects option on click and calls onChange', async () => {
    const handleChange = vi.fn();
    render(
      <Dropdown label="Member" options={mockOptions} onChange={handleChange} />
    );
    await userEvent.click(screen.getByRole('button'));

    const option = screen.getByText('Marcus Sterling');
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('ms-2', mockOptions[1]);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not select disabled options', async () => {
    const handleChange = vi.fn();
    render(
      <Dropdown label="Member" options={mockOptions} onChange={handleChange} />
    );
    await userEvent.click(screen.getByRole('button'));

    const disabledOption = screen.getByText('Disabled User');
    await userEvent.click(disabledOption);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
