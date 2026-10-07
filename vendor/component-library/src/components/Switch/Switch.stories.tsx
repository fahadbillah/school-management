import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Automated Attendance Reports',
    description: 'Send daily attendance summary email at 5:00 PM.',
    defaultChecked: true,
  },
};

export const SecurityToggle: Story = {
  args: {
    label: 'Require Two-Factor Authentication',
    description: 'Enforce SMS or authenticator passkeys for faculty sign-in.',
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Gradebook Sync Active',
    description: 'Managed by central school board policy.',
    checked: true,
    disabled: true,
  },
};
