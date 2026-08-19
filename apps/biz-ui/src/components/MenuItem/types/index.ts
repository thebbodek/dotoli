import { ButtonHTMLAttributes, RefAttributes } from 'react';

import { IconCircleProps } from '@/components/IconCircle';
import { ColorVariants } from '@/variants';

export interface MenuItemColors {
  LABEL: ColorVariants;
  DESCRIPTION: ColorVariants;
}

export interface MenuItemProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>>,
    Pick<IconCircleProps, 'iconKey'>,
    RefAttributes<HTMLButtonElement> {
  label: string;
  description: string;
}
