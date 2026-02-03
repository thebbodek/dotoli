import clsx from 'clsx';

import {
  StepDialogFooterProps,
  StepDialogPreviousButton,
} from '@/components/shared';
import StepDialogConfirmButton from '@/components/shared/components/DialogOverlay/StepDialog/StepDialogConfirmButton';
import OverlayFooterWrapper from '@/components/shared/components/Overlay/OverlayFooter/OverlayFooterWrapper';
import { Typography } from '@/components/Typography';

const StepDialogFooter = <T extends string>({
  step,
  steps,
  isPending,
  previousOptions,
  confirmOptions,
  className,
  buttonOptions,
  goToStep,
}: StepDialogFooterProps<T>) => {
  const stepKeys = Object.values(steps);
  const currentIndex = step ? stepKeys.indexOf(step) : 0;

  return (
    <OverlayFooterWrapper className={clsx(className, 'justify-between')}>
      <StepDialogPreviousButton
        buttonOptions={buttonOptions}
        currentIndex={currentIndex}
        goToStep={goToStep}
        isPending={isPending}
        previousOptions={previousOptions}
        stepKeys={stepKeys}
      />
      <Typography color='gray-02' variant='body-14-m'>
        <Typography color='gray-07'>{currentIndex + 1}</Typography> /{' '}
        {stepKeys.length}
      </Typography>
      <StepDialogConfirmButton
        buttonOptions={buttonOptions}
        confirmOptions={confirmOptions}
        currentIndex={currentIndex}
        goToStep={goToStep}
        isPending={isPending}
        stepKeys={stepKeys}
      />
    </OverlayFooterWrapper>
  );
};

export default StepDialogFooter;
