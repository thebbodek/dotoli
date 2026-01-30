import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InputLabelWrapperProps } from '@/components/shared/components/InputLabel/types';

const InputLabelWrapper = ({
  htmlFor,
  badge,
  className,
  children,
}: PropsWithChildren<InputLabelWrapperProps>) => {
  return (
    <label
      className={clsx(
        className,
        'leading-none',
        badge && 'flex items-center gap-x-0.5',
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default InputLabelWrapper;
