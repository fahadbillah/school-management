import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Counselor Observations',
    placeholder:
      'Record detailed qualitative observations regarding student engagement...',
    helperText: 'Visible only to certified academic staff.',
  },
};

export const WithCharacterCounter: Story = {
  args: {
    label: 'Incident Summary',
    placeholder: 'Brief summary of the classroom event...',
    maxLength: 250,
    showCharCount: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Evaluation Rubric Notes',
    defaultValue: 'Too short',
    errorMessage: 'Rubric comments must be at least 25 characters.',
  },
};
