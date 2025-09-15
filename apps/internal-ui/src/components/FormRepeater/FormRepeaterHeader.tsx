import { PropsWithChildren } from 'react';

const FormRepeaterHeader = ({ children }: PropsWithChildren) => {
  return <header className='in-flex-h-stack gap-x-3 px-4'>{children}</header>;
};

export default FormRepeaterHeader;
