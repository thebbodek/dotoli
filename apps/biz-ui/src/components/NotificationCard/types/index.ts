import { HTMLAttributes } from 'react';

import { IconCircleProps } from '@/components/IconCircle';
import { NOTIFICATION_CARD_THEMES } from '@/components/NotificationCard/constants';
import { ColorVariants } from '@/variants';

export type NotificationCardTheme =
  (typeof NOTIFICATION_CARD_THEMES)[keyof typeof NOTIFICATION_CARD_THEMES];

export interface NotificationCardColors {
  TITLE: ColorVariants;
  SUB_TEXT: ColorVariants;
  HISTORY_TIME: ColorVariants;
  HISTORY_REGISTRANT: ColorVariants;
  PERIOD: ColorVariants;
}

export interface NotificationCardHistory {
  registeredAt: string;
  registrant: string;
}

export interface NotificationCardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Partial<Pick<IconCircleProps, 'iconKey'>> {
  theme?: NotificationCardTheme;
  highlight?: string;
  title?: string;
  subText?: string;
  history?: NotificationCardHistory;
  period?: string;
  actionLabel?: string;
  onAction?: () => void;
}
