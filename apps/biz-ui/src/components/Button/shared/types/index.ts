import { PhosphorIcon } from '@phosphor-icons/core';

import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import { IconWeights } from '@/components/Icon';

export type ButtonIconPosition =
  (typeof BUTTON_ICON_POSITIONS)[keyof typeof BUTTON_ICON_POSITIONS];

export interface ButtonIconOption {
  iconKey: PhosphorIcon['name'];
  weight?: IconWeights;
}

export interface ButtonIconProps extends ButtonIconOption {
  className?: string;
}
