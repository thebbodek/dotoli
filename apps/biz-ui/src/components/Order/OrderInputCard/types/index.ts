import { HTMLAttributes } from 'react';

import { CtaButtonProps } from '@/components/Button/CtaButton';
import { OrderBoxItem } from '@/components/Order/OrderBox';
import {
  OrderDateInfoProps,
  OrderDateInfoTheme,
} from '@/components/Order/OrderDateInfo';
import {
  ORDER_INPUT_CARD_APPEARANCES,
  ORDER_INPUT_CARD_ORDER_STATUSES,
} from '@/components/Order/OrderInputCard/constants';
import { ColorVariants } from '@/variants';

export type OrderInputCardOrderStatus =
  (typeof ORDER_INPUT_CARD_ORDER_STATUSES)[keyof typeof ORDER_INPUT_CARD_ORDER_STATUSES];

export type OrderInputCardAppearance =
  (typeof ORDER_INPUT_CARD_APPEARANCES)[keyof typeof ORDER_INPUT_CARD_APPEARANCES];

export interface OrderInputCardDayStyles {
  CONTAINER: string;
  LABEL: ColorVariants;
}

export interface OrderInputCardAppearanceStyles {
  CARD: string;
  DAY: OrderInputCardDayStyles;
  DATE_INFO_THEME: OrderDateInfoTheme;
}

export interface OrderInputCardButtonStyles
  extends Required<Pick<CtaButtonProps, 'theme' | 'variant'>> {}

export interface OrderInputCardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<OrderDateInfoProps, 'description' | 'dayType'> {
  orderStatus: OrderInputCardOrderStatus;
  dayLabel: string;
  dateLabel?: string;
  isLocked?: boolean;
  items?: OrderBoxItem[];
  onAction?: CtaButtonProps['onClick'];
}

export interface ResolveOrderInputCardAppearanceProps
  extends Pick<OrderInputCardProps, 'orderStatus' | 'isLocked'> {}

export interface ResolveOrderInputCardDayStyleProps
  extends Pick<OrderInputCardProps, 'dayType'> {
  appearance: OrderInputCardAppearance;
}
