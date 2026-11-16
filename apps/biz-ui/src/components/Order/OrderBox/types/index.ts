import { HTMLAttributes } from 'react';

export interface OrderBoxItem {
  itemName: string;
  quantity: string;
}

export interface OrderBoxProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  items: OrderBoxItem[];
  emptyLabel?: string;
}

export interface OrderBoxRowProps extends OrderBoxItem {}
