import { FormEvent, HTMLAttributes } from 'react';

export interface InputWrapperProps extends HTMLAttributes<HTMLElement> {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}
