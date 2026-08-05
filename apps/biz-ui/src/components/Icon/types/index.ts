import { PhosphorIcon } from '@phosphor-icons/core';
import { HTMLAttributes } from 'react';

import { ICON_WEIGHTS } from '@/components/Icon/constants';

export type IconWeights = (typeof ICON_WEIGHTS)[keyof typeof ICON_WEIGHTS];

export interface IconProps
  extends Pick<
    HTMLAttributes<HTMLSpanElement>,
    'className' | 'title' | 'aria-hidden'
  > {
  iconKey: PhosphorIcon['name'];
  weight?: IconWeights;
}
