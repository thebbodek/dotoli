import { CheckboxSize } from '@/components/Checkbox/types';
import { TypographyVariants } from '@/variants';

export const CHECKBOX_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const CHECKBOX_STATE = {
  DEFAULT: 'default',
  SELECTED: 'selected',
  DISABLED: 'disabled',
} as const;

export const CHECKBOX_ICON_SIZE_STYLES: Record<CheckboxSize, string> = {
  [CHECKBOX_SIZES.SM]: 'h-[1.125rem] w-[1.125rem] text-[0.75rem]',
  [CHECKBOX_SIZES.MD]: 'h-6 w-6 text-[1rem]',
};

export const CHECKBOX_LABEL_SIZE_VARIANTS: Record<
  CheckboxSize,
  TypographyVariants
> = {
  [CHECKBOX_SIZES.SM]: 'body-14-r',
  [CHECKBOX_SIZES.MD]: 'body-16-r',
};

export const CHECKBOX_STYLES = {
  [CHECKBOX_STATE.DEFAULT]: {
    icon: 'border-in-gray-02 bg-in-white',
    label: 'text-in-black',
  },
  [CHECKBOX_STATE.SELECTED]: {
    icon: 'peer-checked:border-in-primary-05 peer-checked:bg-in-primary-05',
    label: 'peer-checked:text-in-black',
  },
  [CHECKBOX_STATE.DISABLED]: {
    icon: 'peer-disabled:border-in-gray-02 peer-disabled:bg-in-gray-02',
    label: 'peer-disabled:text-in-gray-05',
  },
} as const;
