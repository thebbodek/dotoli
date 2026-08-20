import { HTMLAttributes } from 'react';

import { CtaButtonProps } from '@/components/Button/CtaButton/types';
import { IconProps } from '@/components/Icon';
import { NOTIFICATION_VARIANTS } from '@/components/Notification/constants';
import { ColorVariants } from '@/variants';

export type NotificationVariant =
  (typeof NOTIFICATION_VARIANTS)[keyof typeof NOTIFICATION_VARIANTS];

export interface NotificationActionOption
  extends Required<
    Pick<
      CtaButtonProps,
      'label' | 'variant' | 'theme' | 'size' | 'iconPosition' | 'iconOption'
    >
  > {}

export interface NotificationColors {
  COMPANY_NAME: ColorVariants;
  RECEIVED_AT: ColorVariants;
  TITLE: ColorVariants;
  DESCRIPTION: ColorVariants;
}

export interface NotificationProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<IconProps, 'iconKey'> {
  companyName: string;
  receivedAt: string;
  title: string;
  description: string;
  variant?: NotificationVariant;
  onAction?: () => void;
}
