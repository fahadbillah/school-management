import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'busy', 'away', 'offline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: {
    name: 'Marcus Sterling',
    size: 'md',
    status: 'online',
  },
};

export const WithImage: Story = {
  args: {
    name: 'Dr. Alistair Vance',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    size: 'lg',
    status: 'online',
  },
};

export const FallbackIcon: Story = {
  args: {
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar name="Aria Thorne" size="xs" status="online" />
      <Avatar name="Aria Thorne" size="sm" status="away" />
      <Avatar name="Aria Thorne" size="md" status="busy" />
      <Avatar name="Aria Thorne" size="lg" status="offline" />
      <Avatar name="Aria Thorne" size="xl" status="online" />
    </div>
  ),
};
