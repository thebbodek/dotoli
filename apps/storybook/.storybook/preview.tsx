import { SkeletonTheme } from '@bbodek/internal-ui';
import { Toaster } from '@bbodek/utils';
import { DocsContainer, DocsContainerProps } from '@storybook/blocks';
import type { Preview, ReactRenderer } from '@storybook/react';
import { fn } from '@storybook/test';
import 'dayjs/locale/ko';
import { OverlayProvider } from 'overlay-kit';
import { PropsWithChildren } from 'react';

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
      container: ({
        children,
        context,
      }: PropsWithChildren<DocsContainerProps<ReactRenderer>>) => (
        <>
          <DocsContainer context={context}>
            <OverlayProvider>
              <SkeletonTheme>{children}</SkeletonTheme>
            </OverlayProvider>
          </DocsContainer>
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
              <OverlayProvider>
                <div id='portal' />
                <Toaster />
              </OverlayProvider>
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
