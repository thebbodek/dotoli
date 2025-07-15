import { Toaster } from '@bbodek/utils';
import { DocsContainer } from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

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
          <Toaster />
        </>
      ),
    },
  },
  decorators: [
    (Story, { viewMode }) => {
      return (
        <>
          {viewMode !== 'docs' && (
            <>
              <div id='portal' />
              <Toaster />
            </>
          )}
          <Story />
        </>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
