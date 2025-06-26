import { Button, InfoFullScreenDialog } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as FormFullScreenDialogMeta } from './FormFullScreenDialog.stories';

const { isOpen, title, isLoading } = FormFullScreenDialogMeta.argTypes ?? {};

const meta: Meta<typeof InfoFullScreenDialog> = {
  title: 'core/internal-ui/FullScreenDialog/InfoFullScreenDialog',
  component: InfoFullScreenDialog,
  argTypes: {
    isOpen,
    title,
    isLoading,
    onClose: {
      description: 'on close',
      type: 'function',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoFullScreenDialog>;

export const Default: Story = {
  args: { title: '일 평균 수량 지난 주차 보기' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label='자세히 보기' />
        <InfoFullScreenDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className='min-w-sm'
        >
          <div className='bg-gray-02 rounded-8 h-[25.625rem] w-full' />
        </InfoFullScreenDialog>
      </>
    );
  },
};
