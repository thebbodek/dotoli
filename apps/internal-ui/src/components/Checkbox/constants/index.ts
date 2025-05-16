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

export const CHECKBOX_ICON_SIZE_STYLES_MAPPER: Record<CheckboxSize, string> = {
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

export const CHECKBOX_STYLES_MAPPER = {
  [CHECKBOX_STATE.DEFAULT]: {
    icon: 'border-gray-02 bg-white',
    label: 'text-black',
  },
  [CHECKBOX_STATE.SELECTED]: {
    icon: 'group-has-checked:border-primary-06 group-has-checked:bg-primary-06',
    label: 'group-has-checked:text-black',
  },
  [CHECKBOX_STATE.DISABLED]: {
    icon: 'group-has-disabled:border-gray-02 group-has-disabled:bg-gray-02',
    label: 'group-has-disabled:text-gray-05',
  },
} as const;
