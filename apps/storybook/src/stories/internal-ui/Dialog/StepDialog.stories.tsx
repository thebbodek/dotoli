import {
  Button,
  StepActionParams,
  StepDialog,
  useStepDialog,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { overlay } from 'overlay-kit';

import { default as FormDialogMeta } from '@/stories/internal-ui/Dialog/FormDialog.stories';
import FormContent from '@/stories/internal-ui/shared/FormContent';
import {
  useFormContent,
  UseFormContentProps,
} from '@/stories/internal-ui/shared/hooks/useFormContent';
import {
  STEP_TITLES,
  STEPS_MAPPER,
} from '@/stories/internal-ui/shared/StepOverlay/constants';
import {
  StepDialogArgs,
  Steps,
} from '@/stories/internal-ui/shared/StepOverlay/types';

const { isOpen, isLoading, ref, className, children, isPending } =
  FormDialogMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Dialog/StepDialog',
  component: StepDialog,
  argTypes: {
    isOpen,
    steps: {
      control: 'object',
      description: 'step mapper object',
      type: {
        required: true,
        name: 'other',
        value: 'Record<string, StepKeys>',
      },
    },
    titles: {
      control: 'object',
      description: 'step dialog title',
      type: {
        required: true,
        name: 'other',
        value: 'Record<StepKeys, string>',
      },
    },
    step: {
      control: 'text',
      description: 'current step',
      type: {
        required: true,
        name: 'string',
      },
    },
    goToStep: {
      description: 'set current step function',
      type: {
        required: true,
        name: 'function',
      },
    },
    previousOptions: {
      control: 'object',
      description: 'previous button options (disabled, onClick)',
    },
    confirmOptions: {
      control: 'object',
      description: 'confirm button options (disabled, onClick, tooltipOption)',
      type: {
        required: true,
        name: 'other',
        value: 'object',
      },
    },
    onCancel: {
      description: 'cancel button click',
      type: {
        required: true,
        name: 'function',
      },
    },
    isPending,
    isLoading,
    ref,
    className,
    children,
  },
} satisfies Meta<StepDialogArgs>;

export default meta;

type Story = StoryObj<StepDialogArgs>;

const Dialog = ({
  isOpen,
  close,
  ...args
}: UseFormContentProps & StepDialogArgs) => {
  const {
    models: { step },
    operations: { goToStep },
  } = useStepDialog<Steps>({ steps: STEPS_MAPPER });
  const {
    models: { values },
    status: { hasError, isPending },
    operations: { handleChange, handleConfirm },
  } = useFormContent({ close });

  const isError = step === STEPS_MAPPER.FORM ? hasError : false;

  const renderer = () => {
    if (step === STEPS_MAPPER.FORM) {
      return <FormContent handleChange={handleChange} values={values} />;
    }

    return '전송 단계';
  };

  const handleSubmit = ({ step: currentStep }: StepActionParams<Steps>) => {
    if (currentStep === STEPS_MAPPER.SUBMIT) {
      handleConfirm();
    }
  };

  return (
    <StepDialog
      {...args}
      confirmOptions={{
        onClick: handleSubmit,
        disabled: isError,
      }}
      className='flex-v-stack w-[31.125rem] gap-y-6'
      goToStep={goToStep}
      isLoading={args.isLoading || !step}
      isOpen={isOpen}
      isPending={args.isPending || isPending}
      step={step}
      steps={STEPS_MAPPER}
      titles={STEP_TITLES}
      onCancel={close}
    >
      {renderer()}
    </StepDialog>
  );
};

export const Default: Story = {
  render: (args) => {
    return (
      <Button
        label='작성하기'
        onClick={() => {
          overlay.open(({ isOpen, unmount }) => (
            <Dialog {...args} close={unmount} isOpen={isOpen} />
          ));
        }}
      />
    );
  },
};
