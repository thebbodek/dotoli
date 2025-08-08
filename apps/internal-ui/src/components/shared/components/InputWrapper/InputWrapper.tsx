import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InputWrapperProps } from '@/components/shared/components/InputWrapper/types';

const InputWrapper = ({
  children,
  className,
  onSubmit,
  ...props
}: PropsWithChildren<InputWrapperProps>) => {
  const _className = clsx(className, 'in-flex-v-stack');

  if (onSubmit) {
    return (
      <form {...props} className={_className} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }

  return (
    <div {...props} className={_className}>
      {children}
    </div>
  );
};

export default InputWrapper;
