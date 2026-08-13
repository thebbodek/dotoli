import { HTMLAttributes } from 'react';

import { ColorVariants } from '@/variants';

export type OrderDateInfoStyles = Record<
  'DATE' | 'HOLIDAY_DATE' | 'DELIVERY' | 'NO_DELIVERY',
  ColorVariants
>;

export interface OrderDateInfoProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  dateLabel: string;
  deliveryInfo?: string;
  isHoliday?: boolean;
}
