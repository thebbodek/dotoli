import {
  Button,
  BUTTON_SIZES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  InfoDialog,
  InfoDialogProps,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as FormDialogMeta } from '@/stories/internal-ui/Dialog/FormDialog.stories';
import { ConfirmModalArgs } from '@/stories/internal-ui/Modal/ConfirmModal.stories';

const {
  isOpen,
  title,
  confirmOption,
  confirmLabel,
  onConfirm,
  confirmTooltipContent,
  confirmTooltipUseTooltip,
  footerSlot,
  isLoading,
  ref,
  className,
  children,
} = FormDialogMeta.argTypes ?? {};

export interface InfoDialogArgs
  extends Pick<
      ConfirmModalArgs,
      keyof Omit<InfoDialogProps, 'footerSlot' | 'slot' | 'wrapperClassName'>
    >,
    Pick<InfoDialogProps, 'footerSlot'>,
    Pick<
      ConfirmModalArgs,
      | 'confirmLabel'
      | 'onConfirm'
      | 'confirmTooltipContent'
      | 'confirmTooltipUseTooltip'
    > {}

const meta = {
  title: 'core/internal-ui/Dialog/InfoDialog',
  component: InfoDialog,
  argTypes: {
    isOpen,
    title,
    confirmOption,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    footerSlot,
    isLoading,
    ref,
    className,
    children,
  },
} satisfies Meta<InfoDialogArgs>;

export default meta;

type Story = StoryObj<InfoDialogArgs>;

export const Default: Story = {
  args: { title: '일 평균 수량 지난 주차 보기' },
  render: ({
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    ...args
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const confirmOption = args.confirmOption
      ? args.confirmOption
      : {
          label: confirmLabel || '닫기',
          onConfirm,
          tooltipOption: {
            content: confirmTooltipContent,
            useTooltip: confirmTooltipUseTooltip,
          },
        };

    return (
      <>
        <Button label='자세히 보기' onClick={() => setIsOpen(true)} />
        <InfoDialog
          {...args}
          confirmOption={{
            ...confirmOption,
            onConfirm: () => setIsOpen(false),
          }}
          isOpen={isOpen}
        >
          <div className='bg-in-gray-02 rounded-in-8 h-[25.625rem] w-[48.75rem]' />
        </InfoDialog>
      </>
    );
  },
};

export const WithFooterSlot: Story = {
  args: { title: '긴급주문 상세' },
  render: ({ confirmLabel, ...args }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleCancelRequest = () => {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
        setIsOpen(false);
      }, 1000);
    };

    return (
      <>
        <Button label='자세히 보기' onClick={() => setIsOpen(true)} />
        <InfoDialog
          {...args}
          confirmOption={{
            label: confirmLabel || '닫기',
            onConfirm: () => setIsOpen(false),
          }}
          footerSlot={
            <Button
              className='mr-auto'
              isPending={isPending}
              label='요청취소'
              size={BUTTON_SIZES.LG}
              theme={BUTTON_THEMES.RED}
              variant={BUTTON_VARIANTS.TONAL}
              onClick={handleCancelRequest}
            />
          }
          isOpen={isOpen}
        >
          <div className='bg-in-gray-02 rounded-in-8 h-[25.625rem] w-[48.75rem]' />
        </InfoDialog>
      </>
    );
  },
};
