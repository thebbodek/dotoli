import { InputHTMLAttributes, RefAttributes } from 'react';

import {
  CHIP_SELECT_MODES,
  CHIP_STATES,
} from '@/components/Chip/Chip/constants';

export type ChipSelectMode =
  (typeof CHIP_SELECT_MODES)[keyof typeof CHIP_SELECT_MODES];

export type ChipState = (typeof CHIP_STATES)[keyof typeof CHIP_STATES];

export type ChipStateStyles = Record<'CONTAINER' | 'ICON', string>;

export interface ChipProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'className' | 'id' | 'name' | 'value'
    >,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    >,
    RefAttributes<HTMLInputElement> {
  label: string;
  selectMode?: ChipSelectMode;
}
