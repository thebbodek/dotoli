import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';

import '@/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
