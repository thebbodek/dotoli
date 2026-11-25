import { HTMLAttributes } from 'react';

import { CtaButtonProps } from '@/components/Button/CtaButton/types';
import { ColorVariants } from '@/variants';

export type OrderDateInfoStyles = Record<
  'DATE' | 'HOLIDAY_DATE' | 'DEADLINE',
  ColorVariants
>;

export interface OrderDateInfoAction
  extends Required<Pick<CtaButtonProps, 'label' | 'onClick'>> {}

export interface OrderDateInfoProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  dateLabel: string;
  isHoliday?: boolean;
  deadlineLabel?: string;
  action?: OrderDateInfoAction;
  isDeadlinePassed?: boolean;
}

export interface GenerateOrderDateInfoDateLabelProps
  extends Pick<OrderDateInfoProps, 'dateLabel' | 'isHoliday'> {}
