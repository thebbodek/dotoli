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
      cancelOption={{ ...cancelOption, onCancel: close }}
      className='w-[31.125rem]'
      confirmOption={{ ...confirmOption, onConfirm: handleConfirm }}
      isOpen={isOpen}
      isPending={args.isPending || isPending}
      possibleConfirm={args.possibleConfirm ?? !hasError}
    >
      <FormContent handleChange={handleChange} values={values} />
    </FormDialog>
  );
};

export const Default: Story = {
  args: { title: '모달 타이틀' },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button label='작성하기' onClick={() => setIsOpen(true)} />
        <Dialog {...args} close={() => setIsOpen(false)} isOpen={isOpen} />
      </>
    );
  },
};
