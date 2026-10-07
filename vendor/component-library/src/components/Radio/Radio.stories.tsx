import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup
      name="term"
      label="Registration Semester"
      defaultValue="fall-2026"
    >
      <Radio
        value="fall-2026"
        label="Fall Semester 2026"
        description="Regular timetable commencing September 1."
      />
      <Radio
        value="spring-2027"
        label="Spring Semester 2027"
        description="Early enrollment starting January 15."
      />
      <Radio
        value="summer-2027"
        label="Summer Intensive"
        description="Accelerated modular schedule."
      />
    </RadioGroup>
  ),
};

export const DisabledOption: Story = {
  render: () => (
    <RadioGroup
      name="status"
      label="Student Academic Standing"
      defaultValue="active"
    >
      <Radio value="active" label="Active Good Standing" />
      <Radio value="probation" label="Academic Probation" />
      <Radio value="withdrawn" label="Withdrawn (Locked)" disabled />
    </RadioGroup>
  ),
};
