import { PropsWithChildren } from 'react';

const InputRadioFieldGroup = ({ children }: PropsWithChildren) => {
  return <div className='flex gap-x-5'>{children}</div>;
};

export default InputRadioFieldGroup;
