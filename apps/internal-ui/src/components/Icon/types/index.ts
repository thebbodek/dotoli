import { IconStyle, PhosphorIcon } from '@phosphor-icons/core';
import { HTMLAttributes } from 'react';

export interface IconProps
  extends Pick<
    HTMLAttributes<HTMLSpanElement>,
    'className' | 'title' | 'aria-hidden'
  > {
  iconKey: PhosphorIcon['name'];
  weight?: `${IconStyle}`;
}
