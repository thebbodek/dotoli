import { ButtonHTMLAttributes } from 'react';

import { ButtonProps } from '@/components/Button/Button';
import { ICON_BUTTON_THEMES } from '@/components/Button/IconButton/constants';
import { IconProps } from '@/components/Icon';
import { ComponentPropsRef } from '@/components/shared';
import { TooltipProps } from '@/components/Tooltip';

export type IconButtonTheme =
  (typeof ICON_BUTTON_THEMES)[keyof typeof ICON_BUTTON_THEMES];

export interface IconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'onClick' | 'disabled' | 'type' | 'aria-label'
    >,
    Pick<IconProps, 'iconKey'>,
    Pick<ButtonProps, 'isPending'>,
    ComponentPropsRef<HTMLButtonElement> {
  theme?: IconButtonTheme;
  className?: TooltipProps['rootClassName'];
  tooltipOption?: Pick<TooltipProps, 'content' | 'placement'>;
}
