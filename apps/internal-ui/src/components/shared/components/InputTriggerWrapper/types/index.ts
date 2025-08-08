import { HTMLAttributes } from 'react';

import { INPUT_TRIGGER_VARIANTS } from '@/components/shared/components/InputTriggerWrapper/constants';
import { ComponentPropsRef } from '@/components/shared/types';

export type InputTriggerWrapperVariant =
  (typeof INPUT_TRIGGER_VARIANTS)[keyof typeof INPUT_TRIGGER_VARIANTS];

export interface InputTriggerWrapperProps
  extends ComponentPropsRef<HTMLDivElement>,
    Pick<
      HTMLAttributes<HTMLDivElement>,
      'className' | 'role' | 'aria-disabled' | 'onClick'
    > {
  variant?: InputTriggerWrapperVariant;
  disabled?: boolean;
  isError?: boolean;
}
