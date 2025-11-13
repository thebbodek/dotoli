import {
  Button,
  FormFullScreenDialog,
  FormFullScreenDialogProps,
} from '@bbodek/internal-ui';
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
} = ConfirmModalMeta.argTypes ?? {};

export interface FormFullScreenDialogArgs
  extends Pick<ConfirmModalArgs, keyof FormFullScreenDialogProps>,
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
  title: 'core/internal-ui/FullScreenDialog/FormFullScreenDialog',
  component: FormFullScreenDialog,
  argTypes: {
    isOpen: {
      ...isOpen,
      description: 'is open full screen dialog',
    },
    title: {
      ...title,
      description: 'full screen dialog title',
    },
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
  },
} satisfies Meta<FormFullScreenDialogArgs>;

export default meta;

type Story = StoryObj<FormFullScreenDialogArgs>;

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
}: UseFormContentProps & FormFullScreenDialogArgs) => {
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
    <FormFullScreenDialog
      {...args}
      isOpen={isOpen}
      possibleConfirm={args.possibleConfirm ?? !hasError}
      isPending={args.isPending || isPending}
      confirmOption={{ ...confirmOption, onConfirm: handleConfirm }}
      cancelOption={{ ...cancelOption, onCancel: close }}
      className='min-w-sm'
    >
      <FormContent values={values} handleChange={handleChange} />
    </FormFullScreenDialog>
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
