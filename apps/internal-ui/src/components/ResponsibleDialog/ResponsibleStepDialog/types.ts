import { ReactElement } from 'react';

import { StepDialogProps } from '@/components/shared';

export type ResponsibleStepDialogType = <T extends string>(
  props: StepDialogProps<T>,
) => ReactElement;

export interface ResponsibleStepDialogProps<T extends string>
  extends StepDialogProps<T> {
  mobileOptions?: Partial<Omit<StepDialogProps<T>, 'children'>>;
}
