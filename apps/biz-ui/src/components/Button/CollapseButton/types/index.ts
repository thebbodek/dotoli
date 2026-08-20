import { ButtonHTMLAttributes, RefAttributes } from 'react';

export interface CollapseButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'aria-controls'
    >,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>>,
    RefAttributes<HTMLButtonElement> {
  isOpen: boolean;
}
