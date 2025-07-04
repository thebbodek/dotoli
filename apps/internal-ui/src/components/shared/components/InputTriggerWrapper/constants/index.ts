import { InputTriggerWrapperVariant } from '@/components/shared/components/InputTriggerWrapper/types';

export const INPUT_TRIGGER_VARIANTS = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SEARCH: 'search',
} as const;

export const INPUT_TRIGGER_STYLES: Record<InputTriggerWrapperVariant, string> =
  {
    [INPUT_TRIGGER_VARIANTS.INPUT]: 'py-2 text-in-body-16-r h-10',
    [INPUT_TRIGGER_VARIANTS.TEXTAREA]:
      'py-3 text-in-body-16-r h-[10.625rem] relative',
    [INPUT_TRIGGER_VARIANTS.SEARCH]: 'h-8 text-in-body-14-r',
  };

export const INPUT_TRIGGER_STATES = {
  DEFAULT: 'DEFAULT',
  ERROR: 'ERROR',
  DISABLED: 'DISABLED',
} as const;

export const INPUT_TRIGGER_STATE_STYLES = {
  [INPUT_TRIGGER_STATES.DEFAULT]: 'border-in-gray-02 bg-in-white text-in-black',
  [INPUT_TRIGGER_STATES.ERROR]: 'border-in-red-04 bg-in-white',
  [INPUT_TRIGGER_STATES.DISABLED]:
    'bg-in-gray-02 text-in-gray-05 cursor-not-allowed border-in-gray-02',
} as const;
