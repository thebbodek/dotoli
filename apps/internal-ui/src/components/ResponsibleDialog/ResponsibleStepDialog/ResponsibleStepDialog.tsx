import { RESPONSIBLE_STATUS, useResponsible } from '@bbodek/hooks';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import {
  ResponsibleStepDialogProps,
  ResponsibleStepDialogType,
} from '@/components/ResponsibleDialog/ResponsibleStepDialog/types';

const StepDialog = dynamic(
  () => import('@/components/Dialog/StepDialog/StepDialog'),
  { ssr: false },
) as ResponsibleStepDialogType;

const StepFullScreenDialog = dynamic(
  () =>
    import(
      '@/components/FullScreenDialog/StepFullScreenDialog/StepFullScreenDialog'
    ),
  { ssr: false },
) as ResponsibleStepDialogType;

const ResponsibleStepDialog = <T extends string>({
  mobileOptions,
  children,
  ...props
}: PropsWithChildren<ResponsibleStepDialogProps<T>>) => {
  const { status } = useResponsible();

  if (status === RESPONSIBLE_STATUS.MOBILE) {
    return (
      <StepFullScreenDialog {...props} {...mobileOptions}>
        {children}
      </StepFullScreenDialog>
    );
  }

  return <StepDialog {...props}>{children}</StepDialog>;
};

export default ResponsibleStepDialog;
