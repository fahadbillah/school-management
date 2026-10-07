import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect, MultiSelectOption } from './MultiSelect';

const sampleUsers: MultiSelectOption[] = [
  {
    value: 'aria',
    label: 'Aria Thorne',
    description: '#FAC-1002 • Mathematics',
    badge: 'Faculty',
    badgeVariant: 'primary',
    avatar: { initials: 'AT' },
  },
  {
    value: 'marcus',
    label: 'Marcus Vance',
    description: '#FAC-2004 • Physics',
    badge: 'Lab Head',
    badgeVariant: 'success',
    avatar: { initials: 'MV' },
  },
  {
    value: 'elena',
    label: 'Elena Rostova',
    description: '#FAC-3010 • Computer Science',
    badge: 'Chair',
    badgeVariant: 'warning',
    avatar: { initials: 'ER' },
  },
  {
    value: 'david',
    label: 'David Kim',
    description: '#ST-4020 • Robotics',
    badge: 'TA',
    badgeVariant: 'neutral',
    avatar: { initials: 'DK' },
  },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    chipShape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: 'Shape style of the selected chips (rounded or pill)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Assigned Instructors',
    placeholder: 'Search and select instructors...',
    options: sampleUsers,
    defaultValue: ['aria', 'elena'],
    size: 'md',
  },
  render: (args) => (
    <div style={{ maxWidth: '480px', minHeight: '340px' }}>
      <MultiSelect options={sampleUsers} {...args} />
    </div>
  ),
};

const masterModerators: MultiSelectOption[] = [
  {
    value: 'elena',
    label: 'Dr. Elena Thorne',
    description: '#FAC-4102 • Biology',
    badge: 'Lead',
    badgeVariant: 'primary',
    avatar: { initials: 'ET' },
  },
  {
    value: 'sophia',
    label: 'Sophia Miller',
    description: '#ST-98214 • Grade 10-A',
    badge: 'Student Lead',
    badgeVariant: 'success',
    avatar: { initials: 'SM' },
  },
  {
    value: 'alexander',
    label: 'Alexander Chen',
    description: '#ST-98210 • Grade 10-A',
    badge: 'Student',
    badgeVariant: 'neutral',
    avatar: { initials: 'AC' },
  },
  {
    value: 'brianna',
    label: 'Brianna Davis',
    description: '#ST-98211 • Grade 10-A',
    badge: 'Student',
    badgeVariant: 'neutral',
    avatar: { initials: 'BD' },
  },
];

const masterCohorts: MultiSelectOption[] = [
  {
    value: 'grade-10a',
    label: 'Grade 10-A',
    description: 'General Section',
    badge: '32 students',
    badgeVariant: 'neutral',
  },
  {
    value: 'ap-bio',
    label: 'AP Biology',
    description: 'Advanced Placement',
    badge: '28 students',
    badgeVariant: 'neutral',
  },
  {
    value: 'grade-10b',
    label: 'Grade 10-B (Mixed)',
    description: 'Mixed Section',
    badge: 'Partial',
    badgeVariant: 'warning',
  },
  {
    value: 'grade-11',
    label: 'Grade 11 Honors Physics',
    description: 'Honors Track',
    badge: '24 students',
    badgeVariant: 'neutral',
  },
];

export const MasterDesignModeratorsPicker: Story = {
  render: () => (
    <div style={{ maxWidth: '540px', minHeight: '340px' }}>
      <MultiSelect
        label="Assigned Session Moderators"
        placeholder="Select moderators..."
        options={masterModerators}
        defaultValue={['elena', 'sophia']}
        size="md"
      />
    </div>
  ),
};

export const MasterDesignCohortsPicker: Story = {
  render: () => (
    <div style={{ maxWidth: '540px', minHeight: '340px' }}>
      <MultiSelect
        label="Assigned Cohorts & Classes"
        placeholder="Choose classes..."
        options={masterCohorts}
        defaultValue={['grade-10a', 'ap-bio']}
        size="md"
      />
    </div>
  ),
};

export const PillChips: Story = {
  args: {
    label: 'Pill Shape Chips',
    placeholder: 'Choose members...',
    options: sampleUsers,
    defaultValue: ['aria', 'marcus'],
    chipShape: 'pill',
  },
};

export const RoundedChips: Story = {
  args: {
    label: 'Rounded Shape Chips',
    placeholder: 'Choose members...',
    options: sampleUsers,
    defaultValue: ['aria', 'marcus'],
    chipShape: 'rounded',
  },
};
