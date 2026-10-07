import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/index.css';
import '../src/styles/reset.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'app-canvas',
      values: [
        { name: 'app-canvas', value: '#F4FBFA' },
        { name: 'surface-white', value: '#FFFFFF' },
        { name: 'deep-slate', value: '#0F172A' },
      ],
    },
    docs: {
      story: {
        inline: true,
        height: 'auto',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: '160px' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
