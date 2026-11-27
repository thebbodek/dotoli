import { HTMLAttributes, ReactNode } from 'react';

import {
  ORDER_DATE_INFO_DAY_TYPES,
  ORDER_DATE_INFO_SIZES,
  ORDER_DATE_INFO_THEMES,
} from '@/components/Order/OrderDateInfo/constants';

export type OrderDateInfoTheme =
  (typeof ORDER_DATE_INFO_THEMES)[keyof typeof ORDER_DATE_INFO_THEMES];

export type OrderDateInfoSize =
  (typeof ORDER_DATE_INFO_SIZES)[keyof typeof ORDER_DATE_INFO_SIZES];

export type OrderDateInfoDayType =
  (typeof ORDER_DATE_INFO_DAY_TYPES)[keyof typeof ORDER_DATE_INFO_DAY_TYPES];

export interface OrderDateInfoProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  title?: string;
  description?: ReactNode;
  theme?: OrderDateInfoTheme;
  size?: OrderDateInfoSize;
  dayType?: OrderDateInfoDayType;
}
