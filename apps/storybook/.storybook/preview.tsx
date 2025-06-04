import { DocsContainer } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';

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
    docs: {
      container: ({ children, context }) => (
        <>
          <DocsContainer context={context}>{children}</DocsContainer>
          <div id='portal' />
        </>
      ),
    },
  },
  decorators: [
    (Story, { viewMode }) => {
      return (
        <>
          {viewMode !== 'docs' && <div id='portal' />}
          <Story />
        </>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
