import { HTMLAttributes } from 'react';

import { ORDER_BOX_VARIANTS } from '@/components/Order/OrderBox/constants';
import {
  OrderBoxCellProps,
  OrderBoxCellTone,
} from '@/components/Order/OrderBoxCell';

export type OrderBoxVariant =
  (typeof ORDER_BOX_VARIANTS)[keyof typeof ORDER_BOX_VARIANTS];

export interface OrderBoxItem
  extends Pick<OrderBoxCellProps, 'boxes' | 'itemName'> {}

export interface OrderBoxVariantStyles {
  CONTAINER?: string;
  TONE: OrderBoxCellTone;
}

export interface OrderBoxProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  items: OrderBoxItem[];
  variant?: OrderBoxVariant;
}
