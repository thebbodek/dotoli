import { ButtonHTMLAttributes, RefAttributes } from 'react';

import { FILTER_STATES } from '@/components/Button/Filter/constants';
import { ButtonIconOption } from '@/components/Button/shared/types';

export type FilterState = (typeof FILTER_STATES)[keyof typeof FILTER_STATES];

export type FilterStateStyles = Record<'CONTAINER' | 'ICON', string>;

export interface FilterProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'onClick' | 'type'
    >,
    RefAttributes<HTMLButtonElement> {
  label: string;
  isSelected?: boolean;
  iconOption?: ButtonIconOption;
}
