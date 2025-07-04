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
    icon: 'before:bg-in-white border-in-gray-02 bg-in-white',
    label: 'text-in-black',
  },
  [RADIO_STATE.SELECTED]: {
    icon: 'peer-checked:before:bg-in-primary-05 peer-checked:border-in-primary-05',
    label: 'peer-checked:text-in-black',
  },
  [RADIO_STATE.DISABLED]: {
    icon: 'peer-disabled:before:bg-in-gray-02 peer-disabled:border-in-gray-02',
    label: 'peer-disabled:text-in-gray-05',
  },
} as const;
