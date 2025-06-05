import { ToggleSize } from '@/components/Toggle/types';
import { TypographyVariants } from '@/variants';

export const TOGGLE_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const TOGGLE_STATE = {
  DEFAULT: 'default',
  SELECTED: 'selected',
  DISABLED: 'disabled',
} as const;

export const TOGGLE_WITH_LABEL_SIZE_STYLES: Record<ToggleSize, string> = {
  [TOGGLE_SIZES.SM]: 'gap-x-[0.5rem]',
  [TOGGLE_SIZES.MD]: 'gap-x-[0.625rem]',
};

export const TOGGLE_ICON_SIZE_STYLES: Record<ToggleSize, string> = {
  [TOGGLE_SIZES.SM]: 'h-[1.25rem] w-[2.25rem] before:h-[1rem] before:w-[1rem]',
  [TOGGLE_SIZES.MD]:
    'h-[1.5rem] w-[2.75rem] before:h-[1.25rem] before:w-[1.25rem]',
};

export const TOGGLE_LABEL_SIZE_VARIANTS: Record<
  ToggleSize,
  TypographyVariants
> = {
  [TOGGLE_SIZES.SM]: 'body-14-r',
  [TOGGLE_SIZES.MD]: 'body-18-r',
};

export const TOGGLE_STYLES = {
  [TOGGLE_STATE.DEFAULT]: {
    icon: 'bg-gray-03 before:bg-white before:-translate-x-1/2',
    label: 'text-black',
  },
  [TOGGLE_STATE.SELECTED]: {
    icon: 'peer-checked:bg-primary-05 peer-checked:before:translate-x-1/2',
    label: '',
  },
  [TOGGLE_STATE.DISABLED]: {
    icon: 'peer-disabled:bg-gray-02 peer-disabled:before:bg-gray-01',
    label: 'peer-disabled:text-gray-05',
  },
} as const;
