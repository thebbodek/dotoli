import { Button, InfoDialog } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as FormDialogMeta } from '@/stories/internal-ui/Dialog/FormDialog.stories';

const { isOpen, title, confirmOption, isLoading } =
  FormDialogMeta.argTypes ?? {};

const meta: Meta<typeof InfoDialog> = {
  title: 'core/internal-ui/Dialog/InfoDialog',
  component: InfoDialog,
  argTypes: {
    isOpen,
    title,
    confirmOption,
    isLoading,
  },
};

export default meta;

type Story = StoryObj<typeof InfoDialog>;

export const Default: Story = {
  args: { title: '일 평균 수량 지난 주차 보기' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label='자세히 보기' />
        <InfoDialog
          {...args}
          isOpen={isOpen}
          confirmOption={{
            label: args.confirmOption?.label ?? '닫기',
            onConfirm: () => setIsOpen(false),
          }}
        >
          <div className='bg-in-gray-02 rounded-in-8 h-[25.625rem] w-[48.75rem]' />
        </InfoDialog>
      </>
    );
  },
};
