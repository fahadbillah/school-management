import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { UserFallbackIcon } from '../common/Icons';
import {
  CalendarIcon,
  iconMap,
  iconOptions,
} from '../common/storybookIconHelper';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      options: iconOptions,
      mapping: iconMap,
      control: {
        type: 'select',
      },
      description: 'Select an icon to display on the stat card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    title: 'Daily Attendance Rate',
    value: '97.8%',
    description: '35 of 36 students verified present',
    trend: { value: '+1.5%', direction: 'up' },
    icon: <CalendarIcon size={16} />,
  },
  render: (args) => (
    <div style={{ maxWidth: '300px' }}>
      <StatCard {...args} />
    </div>
  ),
};

export const Highlighted: Story = {
  args: {
    title: 'Active Faculty on Campus',
    value: '142',
    description: 'Full capacity in session',
    highlighted: true,
    icon: <UserFallbackIcon size={16} />,
  },
  render: (args) => (
    <div style={{ maxWidth: '300px' }}>
      <StatCard {...args} />
    </div>
  ),
};

export const DashboardGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        maxWidth: '960px',
      }}
    >
      <StatCard
        title="Overall Attendance"
        value="98.2%"
        description="Across 12 class cohorts"
        trend={{ value: '+2.1%', direction: 'up' }}
        icon={<CalendarIcon size={16} />}
      />
      <StatCard
        title="Unexcused Absences"
        value="4"
        description="Immediate guardian follow-up required"
        trend={{ value: '-2', direction: 'down' }}
      />
      <StatCard
        title="Term Progress"
        value="64%"
        description="Week 10 of 16 completed"
        highlighted
      />
    </div>
  ),
};
