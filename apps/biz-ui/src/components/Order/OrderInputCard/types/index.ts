import { HTMLAttributes } from 'react';

import { BadgeProps } from '@/components/Badge';
import { CtaButtonProps } from '@/components/Button/CtaButton';
import { OrderBoxItem } from '@/components/Order/OrderBox';
import {
  ORDER_INPUT_CARD_BADGE_THEMES,
  ORDER_INPUT_CARD_ORDER_STATUSES,
} from '@/components/Order/OrderInputCard/constants';
import { ColorVariants } from '@/variants';

export type OrderInputCardOrderStatus =
  (typeof ORDER_INPUT_CARD_ORDER_STATUSES)[keyof typeof ORDER_INPUT_CARD_ORDER_STATUSES];

export type OrderInputCardBadgeTheme =
  (typeof ORDER_INPUT_CARD_BADGE_THEMES)[keyof typeof ORDER_INPUT_CARD_BADGE_THEMES];

export interface OrderInputCardDayStyles {
  CONTAINER: string;
  LABEL: ColorVariants;
}

export interface OrderInputCardStatusStyles {
  CARD: string;
  DAY: OrderInputCardDayStyles;
  DATE: ColorVariants;
}

export interface OrderInputCardButtonStyles
  extends Required<Pick<CtaButtonProps, 'theme' | 'variant'>> {}

export interface OrderInputCardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  orderStatus: OrderInputCardOrderStatus;
  dayLabel: string;
  dateLabel?: string;
  isHoliday?: boolean;
  statusLabel?: string;
  badgeLabel?: BadgeProps['label'];
  badgeTheme?: OrderInputCardBadgeTheme;
  items?: OrderBoxItem[];
  onAction?: CtaButtonProps['onClick'];
}

export interface ResolveOrderInputCardDayStyleProps
  extends Pick<OrderInputCardProps, 'orderStatus' | 'isHoliday'> {}

export interface GenerateOrderInputCardDateLabelProps
  extends Pick<OrderInputCardProps, 'dateLabel' | 'isHoliday'> {}
