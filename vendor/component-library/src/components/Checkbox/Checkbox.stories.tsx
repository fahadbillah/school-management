import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Send email confirmation',
  },
};

export const CheckedByDefault: Story = {
  args: {
    label: 'Subscribe to semester notices',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Allow Guardian Access',
    description:
      'Enables parents or guardians to review weekly attendance summaries.',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all student records',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Mandatory Compliance Agreement',
    description:
      'This agreement cannot be unselected after term initialization.',
    checked: true,
    disabled: true,
  },
};
