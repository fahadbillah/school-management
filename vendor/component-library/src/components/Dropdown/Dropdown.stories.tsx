import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownOption } from './Dropdown';

const userOptions: DropdownOption[] = [
  {
    value: 'dr-vance',
    label: 'Dr. Eleanor Vance',
    description: 'Faculty Chair • Physics II',
    avatar: {
      name: 'Eleanor Vance',
      status: 'online',
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  },
  {
    value: 'prof-marcus',
    label: 'Prof. Marcus Sterling',
    description: 'Senior Lecturer • Mathematics',
    avatar: {
      name: 'Marcus Sterling',
      status: 'online',
    },
  },
  {
    value: 'aria-t',
    label: 'Aria Thorne',
    description: 'Teaching Assistant • Chemistry',
    avatar: {
      name: 'Aria Thorne',
      status: 'away',
    },
  },
  {
    value: 'liam-g',
    label: 'Liam Gallagher',
    description: 'Lab Technician • Biology',
    avatar: {
      name: 'Liam Gallagher',
      status: 'offline',
    },
  },
  {
    value: 'dr-hayes',
    label: 'Dr. Robert Hayes (On Sabbatical)',
    description: 'Academic Advisor',
    disabled: true,
    avatar: {
      name: 'Robert Hayes',
      status: 'offline',
    },
  },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const WithAvatars: Story = {
  args: {
    label: 'Assign Class Instructor',
    placeholder: 'Choose faculty member...',
    helperText: 'Select an instructor to assign to this section.',
    options: userOptions,
    defaultValue: 'dr-vance',
  },
  render: (args) => (
    <div style={{ maxWidth: '400px', minHeight: '320px' }}>
      <Dropdown {...args} />
    </div>
  ),
};

export const UnselectedState: Story = {
  args: {
    label: 'Assign Class Instructor',
    placeholder: 'Choose faculty member...',
    options: userOptions,
    isRequired: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '400px', minHeight: '320px' }}>
      <Dropdown {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Evaluator',
    placeholder: 'Select evaluator...',
    options: userOptions,
    errorMessage:
      'An active faculty member must be assigned before submission.',
  },
  render: (args) => (
    <div style={{ maxWidth: '400px', minHeight: '320px' }}>
      <Dropdown {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '400px',
      }}
    >
      <Dropdown
        label="Small Dropdown (36px)"
        size="sm"
        options={userOptions}
        defaultValue="prof-marcus"
      />
      <Dropdown
        label="Medium Dropdown (44px, Default)"
        size="md"
        options={userOptions}
        defaultValue="dr-vance"
      />
      <Dropdown
        label="Large Dropdown (52px)"
        size="lg"
        options={userOptions}
        defaultValue="aria-t"
      />
    </div>
  ),
};
