import { HTMLAttributes } from 'react';

import {
  BOTTOM_TAB_STATES,
  BOTTOM_TAB_VALUES,
} from '@/components/BottomTab/constants';
import { IconProps } from '@/components/Icon';
import { ColorVariants } from '@/variants';

export type BottomTabValue =
  (typeof BOTTOM_TAB_VALUES)[keyof typeof BOTTOM_TAB_VALUES];

export type BottomTabState =
  (typeof BOTTOM_TAB_STATES)[keyof typeof BOTTOM_TAB_STATES];

export interface BottomTabStateStyles {
  ICON: string;
  LABEL: ColorVariants;
}

export interface BottomTabItemOption extends Pick<IconProps, 'iconKey'> {
  value: BottomTabValue;
  label: string;
}

export interface BottomTabProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  value: BottomTabValue;
  onChange: (value: BottomTabValue) => void;
}

export interface BottomTabItemProps
  extends BottomTabItemOption,
    Pick<BottomTabProps, 'onChange'> {
  isSelected: boolean;
}
