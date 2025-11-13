import { Button, FormDialog, FormDialogProps } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  ConfirmModalArgs,
  default as ConfirmModalMeta,
} from '../Modal/ConfirmModal.stories';
import FormContent from '@/stories/internal-ui/shared/FormContent';
import {
  useFormContent,
  UseFormContentProps,
} from '@/stories/internal-ui/shared/hooks/useFormContent';

const {
  isOpen,
  title,
  confirmOption,
  confirmLabel,
  onConfirm,
  confirmTooltipContent,
  confirmTooltipUseTooltip,
  cancelOption,
  cancelLabel,
  onCancel,
  isLoading,
  ref,
  className,
  children,
  possibleConfirm,
  isPending,
} = ConfirmModalMeta.argTypes;

export interface FormDialogArgs
  extends Pick<ConfirmModalArgs, keyof FormDialogProps>,
    Pick<
      ConfirmModalArgs,
      | 'confirmLabel'
      | 'onConfirm'
      | 'confirmTooltipContent'
      | 'confirmTooltipUseTooltip'
      | 'cancelLabel'
      | 'onCancel'
    > {}

const meta = {
  title: 'core/internal-ui/Dialog/FormDialog',
  component: FormDialog,
  argTypes: {
    isOpen: {
      ...isOpen,
      description: 'is open dialog',
    },
    title: {
      ...title,
      description: 'dialog title',
    },
    confirmOption,
    confirmLabel,
    onConfirm,
    confirmTooltipContent,
    confirmTooltipUseTooltip,
    cancelOption,
    cancelLabel,
    onCancel,
    possibleConfirm,
    isPending,
    isLoading,
    ref,
    className,
    children,
  },
} satisfies Meta<FormDialogArgs>;

export default meta;

type Story = StoryObj<FormDialogArgs>;

const Dialog = ({
  isOpen,
  close,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
  confirmTooltipContent,
  confirmTooltipUseTooltip,
  ...args
}: UseFormContentProps & FormDialogArgs) => {
  const {
    models: { values },
    status: { hasError, isPending },
    operations: { handleChange, handleConfirm },
  } = useFormContent({ close });

  const confirmOption = args.confirmOption
    ? args.confirmOption
    : {
        label: confirmLabel || '작성 완료',
        tooltipOption: {
          content: confirmTooltipContent,
          useTooltip: confirmTooltipUseTooltip,
        },
      };

  const cancelOption = args.cancelOption
    ? args.cancelOption
    : {
        label: cancelLabel || '작성 취소',
        onCancel,
      };

  return (
    <FormDialog
      {...args}
      isOpen={isOpen}
      possibleConfirm={args.possibleConfirm ?? !hasError}
      isPending={args.isPending || isPending}
      className='w-[31.125rem]'
      confirmOption={{ ...confirmOption, onConfirm: handleConfirm }}
      cancelOption={{ ...cancelOption, onCancel: close }}
    >
      <FormContent values={values} handleChange={handleChange} />
    </FormDialog>
  );
};

export const Default: Story = {
  args: { title: '모달 타이틀' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)} label='작성하기' />
        <Dialog {...args} isOpen={isOpen} close={() => setIsOpen(false)} />
      </>
    );
  },
};
