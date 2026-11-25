import { HTMLAttributes } from 'react';

import { ORDER_BOX_CELL_STATES } from '@/components/Order/OrderBox/constants';

export type OrderBoxCellState =
  (typeof ORDER_BOX_CELL_STATES)[keyof typeof ORDER_BOX_CELL_STATES];

export interface OrderBoxItem {
  packageName: string;
  boxCount: number;
  unitCount: number;
}

export interface OrderBoxProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  items: OrderBoxItem[];
  emptyLabel?: string;
}

export interface OrderBoxListProps
  extends Pick<OrderBoxProps, 'items' | 'className'> {
  isMuted?: boolean;
}

export interface OrderBoxCellProps
  extends OrderBoxItem,
    Pick<OrderBoxListProps, 'isMuted'> {}

export interface ResolveOrderBoxCellStateProps
  extends Pick<OrderBoxCellProps, 'boxCount' | 'isMuted'> {}

export interface GenerateOrderBoxQuantityLabelProps
  extends Pick<OrderBoxItem, 'boxCount' | 'unitCount'> {}
