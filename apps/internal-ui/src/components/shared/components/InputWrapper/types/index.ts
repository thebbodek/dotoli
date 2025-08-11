import { HTMLAttributes } from 'react';

export interface InputWrapperProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onSubmit'>,
    Pick<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {}
