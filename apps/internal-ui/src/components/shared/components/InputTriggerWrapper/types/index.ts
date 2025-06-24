import { HTMLAttributes } from 'react';

import { ComponentPropsRef } from '@/components/shared/types';
import { INPUT_TRIGGER_WRAPPER_VARIANTS } from '@/components/shared/components/InputTriggerWrapper/constants';

export type InputTriggerWrapperVariant =
  (typeof INPUT_TRIGGER_WRAPPER_VARIANTS)[keyof typeof INPUT_TRIGGER_WRAPPER_VARIANTS];

export interface InputTriggerWrapperProps
  extends ComponentPropsRef<HTMLDivElement>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'role'> {
  variant?: InputTriggerWrapperVariant;
  disabled?: boolean;
  isError?: boolean;
}
