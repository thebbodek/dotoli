import { PropsWithChildren } from 'react';

const InputCheckboxFieldGroup = ({ children }: PropsWithChildren) => {
  return <div className='in-flex-v-stack gap-y-0.5'>{children}</div>;
};

export default InputCheckboxFieldGroup;
