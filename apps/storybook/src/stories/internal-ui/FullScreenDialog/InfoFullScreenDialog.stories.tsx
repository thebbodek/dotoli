import { Button, InfoFullScreenDialog } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as FormFullScreenDialogMeta } from './FormFullScreenDialog.stories';

const { isOpen, title, isLoading, ref, className, children } =
  FormFullScreenDialogMeta.argTypes ?? {};

const meta = {
  title: 'core/internal-ui/FullScreenDialog/InfoFullScreenDialog',
  component: InfoFullScreenDialog,
  argTypes: {
    isOpen,
    title,
    onClose: {
      description: 'on close',
      type: { name: 'function', required: true },
    },
    isLoading,
    ref,
    className,
    children,
  },
} satisfies Meta<typeof InfoFullScreenDialog>;

export default meta;

type Story = StoryObj<typeof InfoFullScreenDialog>;

export const Default: Story = {
  args: { title: '일 평균 수량 지난 주차 보기' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='자세히 보기' onClick={() => setIsOpen(true)} />
        <InfoFullScreenDialog
          {...args}
          className='min-w-sm'
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className='bg-in-gray-02 rounded-in-8 h-[25.625rem] w-full' />
        </InfoFullScreenDialog>
      </>
    );
  },
};
