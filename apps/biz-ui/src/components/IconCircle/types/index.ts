import { HTMLAttributes } from 'react';

import { IconProps } from '@/components/Icon';
import {
  ICON_CIRCLE_SIZES,
  ICON_CIRCLE_THEMES,
} from '@/components/IconCircle/constants';

export type IconCircleSize =
  (typeof ICON_CIRCLE_SIZES)[keyof typeof ICON_CIRCLE_SIZES];

export type IconCircleTheme =
  (typeof ICON_CIRCLE_THEMES)[keyof typeof ICON_CIRCLE_THEMES];

export interface IconCircleSizeStyles {
  CONTAINER: string;
  ICON: string;
}

export interface IconCircleProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<IconProps, 'iconKey' | 'weight'> {
  size?: IconCircleSize;
  theme?: IconCircleTheme;
}
