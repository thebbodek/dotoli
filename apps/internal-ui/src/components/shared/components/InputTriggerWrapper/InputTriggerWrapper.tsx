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
  'aria-disabled': ariaDisabled,
  onClick,
  role,
}: PropsWithChildren<InputTriggerWrapperProps>) => {
  return (
    <div
      className={clsx(
        className,
        INPUT_TRIGGER_STYLES[variant],
        'rounded-in-8 in-flex-h-stack items-center justify-between gap-x-2 overflow-hidden border px-4 py-2',
        disabled && INPUT_TRIGGER_STATE_STYLES.DISABLED,
        !disabled && isError && INPUT_TRIGGER_STATE_STYLES.ERROR,
        !disabled && !isError && INPUT_TRIGGER_STATE_STYLES.DEFAULT,
      )}
      aria-disabled={ariaDisabled}
      ref={ref}
      role={role}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default InputTriggerWrapper;
