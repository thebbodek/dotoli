import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import InputLabelText from '@/components/shared/components/InputLabel/InputLabelTitle';
import { InputLabelProps } from '@/components/shared/components/InputLabel/types';

const InputLabel = ({
  htmlFor,
  children,
  hidden = false,
  className,
  ...props
}: PropsWithChildren<InputLabelProps>) => {
  const classNames = clsx(className, hidden && 'sr-only');

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={clsx(classNames, 'leading-none')}>
        <InputLabelText {...props}>{children}</InputLabelText>
      </label>
    );
  }

  return (
    <InputLabelText {...props} className={classNames}>
      {children}
    </InputLabelText>
  );
};

export default InputLabel;
