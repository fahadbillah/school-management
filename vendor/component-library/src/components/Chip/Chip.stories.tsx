import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Avatar } from '../Avatar';
import {
  iconMap,
  iconOptions,
  avatarMap,
  avatarOptions,
} from '../common/storybookIconHelper';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'tonal',
        'outline',
        'success',
        'warning',
        'danger',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
    },
    avatar: {
      options: avatarOptions,
      mapping: avatarMap,
      control: {
        type: 'select',
      },
      description: 'Select an avatar token to render in the chip',
    },
    icon: {
      options: iconOptions,
      mapping: iconMap,
      control: {
        type: 'select',
      },
      description: 'Select an icon to render in the chip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Grade 10',
    variant: 'neutral',
    size: 'md',
  },
};

export const StandardSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Chip size="sm" variant="tonal" label="24px Dense" />
      <Chip size="md" variant="primary" label="32px Standard" />
      <Chip size="lg" variant="outline" label="40px Touch" />
    </div>
  ),
};

export const FilterChipsWithStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip label="Grade 10" variant="neutral" onClick={() => {}} />
      <Chip label="Grade 10" variant="primary" selected onClick={() => {}} />
      <Chip label="Grade 10" variant="tonal" count="14" onClick={() => {}} />
      <Chip label="Archived (0)" variant="neutral" disabled />
    </div>
  ),
};

export const WithAvatarTokens: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Chip
        size="md"
        label="Dr. Vance"
        avatar={<Avatar initials="RV" name="Robert Vance" />}
        onRemove={() => {}}
      />
      <Chip
        size="md"
        label="Dr. Thorne"
        avatar={<Avatar initials="ET" name="Elena Thorne" />}
        onRemove={() => {}}
      />
      <Chip
        size="md"
        label="Sophia M."
        avatar={<Avatar initials="SM" name="Sophia Miller" />}
        onRemove={() => {}}
      />
      <Chip
        size="sm"
        label="Aria T."
        avatar={<Avatar initials="AT" name="Aria Thorne" />}
        onRemove={() => {}}
      />
      <Chip
        size="lg"
        label="Sophia Miller"
        avatar={<Avatar initials="SM" name="Sophia Miller" />}
        onRemove={() => {}}
      />
    </div>
  ),
};

export const SuggestionAndChoiceChips: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Chip
        shape="rounded"
        label="Period 2"
        variant="neutral"
        onClick={() => {}}
      />
      <Chip
        shape="rounded"
        label="Period 3: Biology"
        variant="primary"
        selected
        onClick={() => {}}
      />
      <Chip
        shape="rounded"
        label="Grade 10-A"
        variant="tonal"
        onRemove={() => {}}
      />
      <Chip
        shape="rounded"
        label="AP Biology"
        variant="tonal"
        onRemove={() => {}}
      />
      <Chip
        shape="rounded"
        label="Period 6 (Archived)"
        variant="neutral"
        disabled
      />
    </div>
  ),
};

export const SemanticStatusChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip size="sm" variant="success" label="Present 98.4%" />
      <Chip size="sm" variant="warning" label="Late Pending" />
      <Chip size="sm" variant="danger" label="Unexcused" />
    </div>
  ),
};
