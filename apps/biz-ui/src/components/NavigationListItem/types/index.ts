import { ButtonHTMLAttributes } from 'react';

export interface NavigationListItemProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>> {
  label: string;
  value?: string;
}
