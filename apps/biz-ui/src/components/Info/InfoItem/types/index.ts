import { HTMLAttributes } from 'react';

import { INFO_ITEM_THEMES } from '@/components/Info/InfoItem/constants';
import { ColorVariants } from '@/variants';

export type InfoItemTheme =
  (typeof INFO_ITEM_THEMES)[keyof typeof INFO_ITEM_THEMES];

export interface InfoItemThemeStyles {
  ICON: string;
  LABEL: ColorVariants;
}

export interface InfoItemProps
  extends Pick<HTMLAttributes<HTMLParagraphElement>, 'className'> {
  label: string;
  theme?: InfoItemTheme;
}
