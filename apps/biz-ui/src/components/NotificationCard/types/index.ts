import { HTMLAttributes, ReactNode } from 'react';

import { IconCircleProps } from '@/components/IconCircle';
import { NOTIFICATION_CARD_THEMES } from '@/components/NotificationCard/constants';
import { ColorVariants } from '@/variants';

export type NotificationCardTheme =
  (typeof NOTIFICATION_CARD_THEMES)[keyof typeof NOTIFICATION_CARD_THEMES];

export interface NotificationCardColors {
  TITLE: ColorVariants;
  SUB_TEXT: ColorVariants;
  META_TEXT: ColorVariants;
  META_EXTRA_TEXT: ColorVariants;
  PERIOD: ColorVariants;
}

export interface NotificationCardMeta {
  text: string;
  extraText?: string;
}

export interface NotificationCardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Partial<Pick<IconCircleProps, 'iconKey'>> {
  theme?: NotificationCardTheme;
  title?: ReactNode;
  subText?: string;
  meta?: NotificationCardMeta;
  period?: string;
  actionLabel?: string;
  onAction?: () => void;
}
