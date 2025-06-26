import { Button, FormDialog, FormDialogProps } from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as ConfirmModalMeta } from '@/stories/internal-ui/Modal/ConfirmModal.stories';
import FormContent from '@/stories/internal-ui/shared/FormContent';
import {
  UseFormContentProps,
  useFormContent,
} from '@/stories/internal-ui/shared/hooks/useFormContent';

const {
  isOpen,
  title,
  confirmButtonLabel,
  cancelButtonLabel,
  onCancel,
  onConfirm,
  possibleConfirm,
  isPending,
  isLoading,
} = ConfirmModalMeta.argTypes ?? {};

const meta: Meta<typeof FormDialog> = {
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
    confirmButtonLabel,
    cancelButtonLabel,
    onCancel,
    onConfirm,
    possibleConfirm,
    isPending,
    isLoading,
  },
};

export default meta;

type Story = StoryObj<typeof FormDialog>;

const Dialog = ({
  isOpen,
  close,
  ...args
}: UseFormContentProps & FormDialogProps) => {
  const {
    models: { values },
    status: { hasError, isPending },
    operations: { handleChange, handleConfirm },
  } = useFormContent({ close });

  return (
    <FormDialog
      {...args}
      isOpen={isOpen}
      possibleConfirm={args.possibleConfirm ?? !hasError}
      isPending={args.isPending || isPending}
      onCancel={close}
      onConfirm={handleConfirm}
      confirmButtonLabel={args.confirmButtonLabel ?? '작성 완료'}
      cancelButtonLabel={args.cancelButtonLabel ?? '작성 취소'}
      className='w-[31.125rem]'
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
