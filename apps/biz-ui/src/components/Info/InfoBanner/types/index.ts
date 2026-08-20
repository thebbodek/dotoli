import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import { INFO_BANNER_THEMES } from '@/components/Info/InfoBanner/constants';

export type InfoBannerTheme =
  (typeof INFO_BANNER_THEMES)[keyof typeof INFO_BANNER_THEMES];

export interface InfoBannerThemeStyles {
  BACKGROUND: string;
  RING: string;
  STICKY_RING: string;
  ICON: string;
}

export interface InfoBannerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: string;
  theme?: InfoBannerTheme;
  isSticky?: boolean;
}
