import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, ComboboxOption } from './Combobox';

const sampleEntities: ComboboxOption[] = [
  {
    value: 'bio-101',
    label: 'Biology 101: Cell Structure',
    group: 'Courses & Modules',
    badge: 'CRN-4021',
  },
  {
    value: 'ap-bio',
    label: 'AP Biology Honors Lab',
    group: 'Courses & Modules',
    badge: 'CRN-4029',
  },
  {
    value: 'cs-201',
    label: 'Computer Science: Algorithms',
    group: 'Courses & Modules',
    badge: 'CRN-5120',
  },
  {
    value: 'dr-vance',
    label: 'Dr. Robert Vance',
    group: 'Faculty Members',
    badge: 'Lead Faculty',
  },
  {
    value: 'dr-thorne',
    label: 'Dr. Elena Thorne',
    group: 'Faculty Members',
    badge: 'Department Chair',
  },
  {
    value: 'prof-chen',
    label: 'Prof. Alexander Chen',
    group: 'Faculty Members',
    badge: 'Associate Prof',
  },
];

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Quick Entity Finder',
    placeholder: 'Search courses or faculty...',
    options: sampleEntities,
    defaultValue: 'bio-101',
  },
  render: (args) => (
    <div style={{ maxWidth: '480px', minHeight: '380px' }}>
      <Combobox options={sampleEntities} {...args} />
    </div>
  ),
};

export const OpenFilterView: Story = {
  render: () => (
    <div style={{ maxWidth: '480px', minHeight: '380px' }}>
      <Combobox
        label="Quick Entity Finder"
        placeholder="Type Bio to see matching courses & faculty..."
        options={sampleEntities}
      />
    </div>
  ),
};
