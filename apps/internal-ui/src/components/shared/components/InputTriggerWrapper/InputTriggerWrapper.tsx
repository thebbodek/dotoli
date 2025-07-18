import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  INPUT_TRIGGER_STATE_STYLES,
  INPUT_TRIGGER_STYLES,
  INPUT_TRIGGER_VARIANTS,
} from '@/components/shared/components/InputTriggerWrapper/constants';
import { InputTriggerWrapperProps } from '@/components/shared/components/InputTriggerWrapper/types';

const InputTriggerWrapper = ({
  ref,
  children,
  className,
  variant = INPUT_TRIGGER_VARIANTS.INPUT,
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
        INPUT_TRIGGER_STYLES[variant],
        'rounded-in-8 flex items-center justify-between gap-x-2 overflow-hidden border px-4',
        disabled && INPUT_TRIGGER_STATE_STYLES.DISABLED,
        !disabled && isError && INPUT_TRIGGER_STATE_STYLES.ERROR,
        !disabled && !isError && INPUT_TRIGGER_STATE_STYLES.DEFAULT,
      )}
    >
      {children}
    </div>
  );
};

export default InputTriggerWrapper;
