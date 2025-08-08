import { PropsWithChildren } from 'react';

import InputLabelText from '@/components/shared/components/InputLabel/InputLabelTitle';
import { InputLabelProps } from '@/components/shared/components/InputLabel/types';

const InputLabel = ({
  htmlFor,
  children,
  hidden,
  className,
  ...props
}: PropsWithChildren<InputLabelProps>) => {
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} hidden={hidden} className='leading-none'>
        <InputLabelText {...props}>{children}</InputLabelText>
      </label>
    );
  }

  return (
    <InputLabelText {...props} hidden={hidden}>
      {children}
    </InputLabelText>
  );
};

export default InputLabel;
