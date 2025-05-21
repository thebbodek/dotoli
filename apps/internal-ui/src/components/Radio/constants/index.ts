import { RadioSize } from '@/components/Radio/types';
import { TypographyVariants } from '@/variants';

export const RADIO_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const RADIO_STATE = {
  DEFAULT: 'default',
  SELECTED: 'selected',
  DISABLED: 'disabled',
} as const;

export const RADIO_ICON_SIZE_STYLES: Record<RadioSize, string> = {
  [RADIO_SIZES.SM]:
    'h-[1.125rem] before:h-[0.6875rem] before:w-[0.6875rem] w-[1.125rem]',
  [RADIO_SIZES.MD]: 'h-6 before:h-[0.875rem] before:w-[0.875rem] w-6',
};

export const RADIO_LABEL_SIZE_VARIANTS: Record<RadioSize, TypographyVariants> =
  {
    [RADIO_SIZES.SM]: 'body-14-r',
    [RADIO_SIZES.MD]: 'body-16-r',
  };

export const RADIO_STYLES = {
  [RADIO_STATE.DEFAULT]: {
    icon: 'before:bg-white border-gray-02 bg-white',
    label: 'text-black',
  },
  [RADIO_STATE.SELECTED]: {
    icon: 'peer-checked:before:bg-primary-06 peer-checked:border-primary-06',
    label: 'peer-checked:text-black',
  },
  [RADIO_STATE.DISABLED]: {
    icon: 'peer-disabled:before:bg-gray-02 peer-disabled:border-gray-02',
    label: 'peer-disabled:text-gray-05',
  },
} as const;
