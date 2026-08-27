import { ButtonHTMLAttributes, RefAttributes } from 'react';

export interface ActionChipProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>>,
    RefAttributes<HTMLButtonElement> {
  label: string;
}
