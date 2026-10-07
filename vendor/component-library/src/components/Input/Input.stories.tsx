import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { iconMap, iconOptions } from '../common/storybookIconHelper';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    leftIcon: {
      options: iconOptions,
      mapping: iconMap,
      control: {
        type: 'select',
      },
      description: 'Select an icon to render on the left',
    },
    rightIcon: {
      options: iconOptions,
      mapping: iconMap,
      control: {
        type: 'select',
      },
      description: 'Select an icon to render on the right',
    },
    disabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'e.g. John Doe',
    helperText: 'Enter your legal first and last name.',
  },
};

export const WithIconsInteractive: Story = {
  args: {
    label: 'Search Records',
    placeholder: 'Type keyword or student ID...',
    leftIcon: 'Search' as any,
    rightIcon: 'Close' as any,
    helperText:
      'You can change leftIcon & rightIcon using the Controls tab below.',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'name@institution.edu',
    leftIcon: 'Mail' as any,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter secure password',
    leftIcon: 'Lock' as any,
    isRequired: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Student ID',
    placeholder: 'e.g. STU-2026-001',
    isRequired: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    defaultValue: 'invalid-email',
    errorMessage: 'Please enter a valid academic email address.',
    leftIcon: 'Mail' as any,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Registration Code (Locked)',
    value: 'SYS-LOCKED-99',
    disabled: true,
    leftIcon: 'Lock' as any,
    helperText: 'This field has been locked by administration.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '400px',
      }}
    >
      <Input
        label="Small Input (36px)"
        inputSize="sm"
        leftIcon={iconMap.Search}
        placeholder="Compact density"
      />
      <Input
        label="Medium Input (44px, Default)"
        inputSize="md"
        leftIcon={iconMap.Mail}
        placeholder="Standard touch-compliant"
      />
      <Input
        label="Large Input (52px)"
        inputSize="lg"
        leftIcon={iconMap.User}
        placeholder="High prominence"
      />
    </div>
  ),
};
