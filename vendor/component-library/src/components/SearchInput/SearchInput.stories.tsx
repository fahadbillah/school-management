import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search courses, faculty, rosters...',
    shortcutHint: '⌘K',
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <SearchInput {...args} />
    </div>
  ),
};

export const PreFilledWithClear: Story = {
  args: {
    defaultValue: 'Grade 11-A Chemistry',
    shortcutHint: 'Esc',
  },
  render: (args) => (
    <div style={{ maxWidth: '420px' }}>
      <SearchInput {...args} />
    </div>
  ),
};
