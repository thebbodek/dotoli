import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { INPUT_FEEDBACK_STYLES } from '@/components/shared/components/InputFeedback/constants';
import {
  INPUT_TRIGGER_WRAPPER_STYLES,
  INPUT_TRIGGER_WRAPPER_VARIANTS,
} from '@/components/shared/components/InputTriggerWrapper/constants';
import { InputTriggerWrapperProps } from '@/components/shared/components/InputTriggerWrapper/types';

const InputTriggerWrapper = ({
  ref,
  children,
  className,
  variant = INPUT_TRIGGER_WRAPPER_VARIANTS.INPUT,
  disabled = false,
  isError = false,
  role,
}: PropsWithChildren<InputTriggerWrapperProps>) => {
  return (
    <div
      ref={ref}
      role={role}
      className={clsx(
        className,
        INPUT_TRIGGER_WRAPPER_STYLES[variant],

        'rounded-8 flex items-center justify-between gap-x-2 overflow-hidden border px-4',
        disabled && INPUT_FEEDBACK_STYLES.DISABLED,
        !disabled && isError && INPUT_FEEDBACK_STYLES.ERROR,
        !disabled && !isError && INPUT_FEEDBACK_STYLES.DEFAULT,
      )}
    >
      {children}
    </div>
  );
};

export default InputTriggerWrapper;
