import {
  Button,
  FormFullScreenDialog,
  FormFullScreenDialogProps,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import FormContent from '@/stories/internal-ui/shared/FormContent';
import {
  UseFormContentProps,
  useFormContent,
} from '@/stories/internal-ui/shared/hooks/useFormContent';
import { default as ConfirmModalMeta } from '../Modal/ConfirmModal.stories';

const {
  isOpen,
  title,
  confirmOption,
  cancelOption,
  possibleConfirm,
  isPending,
  isLoading,
} = ConfirmModalMeta.argTypes ?? {};

const meta: Meta<typeof FormFullScreenDialog> = {
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
    cancelOption,
    possibleConfirm,
    isPending,
    isLoading,
  },
};

export default meta;

type Story = StoryObj<typeof FormFullScreenDialog>;

const Dialog = ({
  isOpen,
  close,
  ...args
}: UseFormContentProps & FormFullScreenDialogProps) => {
  const {
    models: { values },
    status: { hasError, isPending },
    operations: { handleChange, handleConfirm },
  } = useFormContent({ close });

  return (
    <FormFullScreenDialog
      {...args}
      isOpen={isOpen}
      possibleConfirm={args.possibleConfirm ?? !hasError}
      isPending={args.isPending || isPending}
      confirmOption={{
        label: args.confirmOption?.label ?? '작성 완료',
        onConfirm: handleConfirm,
      }}
      cancelOption={{
        label: args.cancelOption?.label ?? '작성 취소',
        onCancel: close,
      }}
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
