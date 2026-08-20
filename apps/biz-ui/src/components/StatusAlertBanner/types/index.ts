import { HTMLAttributes } from 'react';

import { IconProps } from '@/components/Icon';
import { STATUS_ALERT_BANNER_THEMES } from '@/components/StatusAlertBanner/constants';

export type StatusAlertBannerTheme =
  (typeof STATUS_ALERT_BANNER_THEMES)[keyof typeof STATUS_ALERT_BANNER_THEMES];

export interface StatusAlertBannerThemeStyles {
  ICON_KEY: IconProps['iconKey'];
  ICON: string;
}

export interface StatusAlertBannerProps
  extends Pick<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'role' | 'aria-live'
  > {
  message: string;
  theme?: StatusAlertBannerTheme;
  onAction?: () => void;
  onDismiss?: () => void;
}
