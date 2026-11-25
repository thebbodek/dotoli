import { HTMLAttributes } from 'react';

import { ColorVariants, TypographyVariants } from '@/variants';

export interface OrderBoxItem {
  itemName: string;
  quantity: string;
  isNoOrder?: boolean;
}

export interface OrderBoxProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  items: OrderBoxItem[];
  emptyLabel?: string;
}

export interface OrderBoxTextStyle {
  VARIANT: TypographyVariants;
  COLOR: ColorVariants;
}

export interface OrderBoxListStyles {
  ITEM_NAME: OrderBoxTextStyle;
  QUANTITY: OrderBoxTextStyle;
  NO_ORDER_COLOR?: ColorVariants;
}

export interface OrderBoxListProps
  extends Pick<OrderBoxProps, 'items' | 'className'> {
  styles: OrderBoxListStyles;
}

export interface OrderBoxRowProps
  extends OrderBoxItem,
    Pick<OrderBoxListProps, 'styles'> {}
