import { InputState, InputVariants } from '@/components/Input/shared/types';

export const INPUT_POPOVER_OFFSET = 6;

export const INPUT_ELEMENTS = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
} as const;

export const INPUT_VARIANTS = {
  ...INPUT_ELEMENTS,
  SEARCH: 'search',
} as const;

export const INPUT_STATE = {
  DEFAULT: 'default',
  FOCUS: 'focus',
  ERROR: 'error',
  DISABLED: 'disabled',
} as const;

export const INPUT_ELEMENT_STYLES: Record<InputVariants, string> = {
  [INPUT_ELEMENTS.INPUT]: 'py-2 text-body-16-r',
  [INPUT_ELEMENTS.TEXTAREA]: 'py-3 text-body-16-r h-[10.625rem] relative',
  [INPUT_VARIANTS.SEARCH]: 'h-8 text-body-14-r',
};

export const INPUT_STYLES: Record<InputState, string> = {
  [INPUT_STATE.DEFAULT]: 'border border-gray-02 bg-white text-black',
  [INPUT_STATE.FOCUS]:
    'focus-within:border-primary-05 focus-within:outline-2 focus-within:outline-gray-02',
  [INPUT_STATE.ERROR]:
    'group-[.group-error]:border-red-04 group-[.group-error]:focus-within:outline-none group-[.group-error]:focus-within:border-red-04',
  [INPUT_STATE.DISABLED]:
    'has-[.input:disabled]:border-gray-02 has-[.input:disabled]:bg-gray-02 has-[.input:disabled]:text-gray-05 has-[.input:disabled]:cursor-not-allowed has-[.input:disabled]:placeholder-gray-05',
};
