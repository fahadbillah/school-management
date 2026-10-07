import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const sampleOptions = [
  { value: '', label: 'Select a department...' },
  { value: 'cs', label: 'Computer Science & Engineering' },
  { value: 'math', label: 'Mathematics & Statistics' },
  { value: 'physics', label: 'Physics & Applied Sciences' },
  { value: 'arts', label: 'Humanities & Fine Arts' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    selectSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Academic Department',
    options: sampleOptions,
    helperText: 'Select your primary assigned academic department.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Academic Department',
    options: sampleOptions,
    errorMessage: 'Please select a valid department to continue.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Academic Year',
    options: [{ value: '2026', label: '2026-2027 (Active Term)' }],
    disabled: true,
    helperText: 'Current term is locked.',
  },
};
