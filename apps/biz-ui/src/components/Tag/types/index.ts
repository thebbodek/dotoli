import { ButtonHTMLAttributes, RefAttributes } from 'react';

export interface TagProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'aria-label'
    >,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>>,
    RefAttributes<HTMLButtonElement> {
  label: string;
}
