import {
  Button,
  ResponsibleStepDialog,
  StepActionParams,
  useStepDialog,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { overlay } from 'overlay-kit';

import { default as StepDialogMeta } from '../Dialog/StepDialog.stories';
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

const { argTypes } = StepDialogMeta;

const meta = {
  title: 'core/internal-ui/ResponsibleDialog/ResponsibleStepDialog',
  component: ResponsibleStepDialog,
  argTypes,
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
    <ResponsibleStepDialog
      {...args}
      confirmOptions={{
        onClick: handleSubmit,
        disabled: isError,
      }}
      mobileOptions={{
        className: 'flex-v-stack min-w-in-mobile gap-y-6',
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
    </ResponsibleStepDialog>
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
