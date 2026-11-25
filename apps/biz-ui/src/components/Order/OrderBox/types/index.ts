import { HTMLAttributes } from 'react';

import { ORDER_BOX_VARIANTS } from '@/components/Order/OrderBox/constants';
import { ColorVariants, TypographyVariants } from '@/variants';

export type OrderBoxVariant =
  (typeof ORDER_BOX_VARIANTS)[keyof typeof ORDER_BOX_VARIANTS];

export interface OrderBoxItem {
  itemName: string;
  quantity: string;
  isNoOrder?: boolean;
}

export interface OrderBoxProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  items: OrderBoxItem[];
  emptyLabel?: string;
  variant?: OrderBoxVariant;
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

export interface OrderBoxVariantStyles {
  CONTAINER: string;
  EMPTY: string;
  LIST: OrderBoxListStyles;
  EMPTY_LABEL: OrderBoxTextStyle;
}

export interface OrderBoxListProps
  extends Pick<OrderBoxProps, 'items' | 'className'> {
  styles: OrderBoxListStyles;
}

export interface OrderBoxRowProps
  extends OrderBoxItem,
    Pick<OrderBoxListProps, 'styles'> {}
