import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { iconMap, iconOptions } from '../common/storybookIconHelper';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    withDot: { control: 'boolean' },
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
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {
  args: {
    children: 'Present / Verified',
    variant: 'success',
    withDot: true,
  },
};

export const WithIconInteractive: Story = {
  args: {
    children: 'Verified Record',
    variant: 'success',
    leftIcon: 'Check' as any,
  },
};

export const Warning: Story = {
  args: {
    children: 'Late / Pending',
    variant: 'warning',
    withDot: true,
  },
};

export const Danger: Story = {
  args: {
    children: 'Absent / Critical',
    variant: 'danger',
    withDot: true,
  },
};

export const Info: Story = {
  args: {
    children: 'Scheduled Exam',
    variant: 'info',
    leftIcon: 'Calendar' as any,
  },
};

export const Neutral: Story = {
  args: {
    children: 'Standard Pill',
    variant: 'neutral',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="success" leftIcon={iconMap.Check}>
        Verified
      </Badge>
      <Badge variant="warning" withDot>
        Late
      </Badge>
      <Badge variant="danger" leftIcon={iconMap.Close}>
        Failed
      </Badge>
      <Badge variant="info" leftIcon={iconMap.Calendar}>
        Scheduled
      </Badge>
      <Badge variant="neutral">General</Badge>
    </div>
  ),
};
