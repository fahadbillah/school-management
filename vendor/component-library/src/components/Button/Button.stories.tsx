import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { iconMap, iconOptions } from '../common/storybookIconHelper';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
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
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
    size: 'md',
    leftIcon: 'Plus' as any,
  },
};

export const SecondarySoft: Story = {
  args: {
    children: 'Secondary Action',
    variant: 'secondary',
    size: 'md',
    rightIcon: 'ArrowRight' as any,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'md',
    leftIcon: 'Calendar' as any,
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
    leftIcon: 'Search' as any,
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Action',
    variant: 'danger',
    size: 'md',
    leftIcon: 'Close' as any,
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving Data...',
    isLoading: true,
    variant: 'primary',
  },
};

export const WithIconsInteractive: Story = {
  args: {
    children: 'Configure Icons in Controls Tab',
    variant: 'primary',
    size: 'md',
    leftIcon: 'Search' as any,
    rightIcon: 'ArrowRight' as any,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant="primary" leftIcon={iconMap.Plus}>
        Primary
      </Button>
      <Button variant="secondary" rightIcon={iconMap.ArrowRight}>
        Secondary / Soft
      </Button>
      <Button variant="outline" leftIcon={iconMap.Calendar}>
        Outline
      </Button>
      <Button variant="ghost" leftIcon={iconMap.Search}>
        Ghost
      </Button>
      <Button variant="danger" leftIcon={iconMap.Close}>
        Danger
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="sm" leftIcon={iconMap.Plus}>
        Small (36px)
      </Button>
      <Button size="md" leftIcon={iconMap.Plus}>
        Medium (44px)
      </Button>
      <Button size="lg" leftIcon={iconMap.Plus}>
        Large (52px)
      </Button>
    </div>
  ),
};
