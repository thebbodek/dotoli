import { HTMLAttributes } from 'react';

import { CtaButtonProps } from '@/components/Button/CtaButton';
import { ORDER_INPUT_CARD_ORDER_STATUSES } from '@/components/Order/OrderInputCard/constants';
import { ColorVariants } from '@/variants';

export type OrderInputCardOrderStatus =
  (typeof ORDER_INPUT_CARD_ORDER_STATUSES)[keyof typeof ORDER_INPUT_CARD_ORDER_STATUSES];

export interface OrderInputCardDayStyles {
  CONTAINER: string;
  LABEL: ColorVariants;
}

export interface OrderInputCardStatusStyles {
  CARD: string;
  DAY: OrderInputCardDayStyles;
  DATE: ColorVariants;
}

export type OrderInputCardButtonStyles = Required<
  Pick<CtaButtonProps, 'theme' | 'variant'>
>;

export type OrderInputCardItemStyles = Record<
  'ORDERED' | 'EMPTY',
  ColorVariants
>;

export interface OrderInputCardItem {
  name: string;
  quantity: number;
}

export interface OrderInputCardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  orderStatus: OrderInputCardOrderStatus;
  dayLabel: string;
  dateLabel?: string;
  isHoliday?: boolean;
  items?: OrderInputCardItem[];
  onAction?: CtaButtonProps['onClick'];
}

export type OrderInputCardItemsProps = Required<
  Pick<OrderInputCardProps, 'items'>
>;

export type ResolveOrderInputCardDayStyleProps = Pick<
  OrderInputCardProps,
  'orderStatus' | 'isHoliday'
>;

export type GenerateOrderInputCardDateLabelProps = Pick<
  OrderInputCardProps,
  'dateLabel' | 'isHoliday'
>;
