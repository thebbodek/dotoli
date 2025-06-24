import { InputTriggerWrapperVariant } from '@/components/shared/components/InputTriggerWrapper/types';

export const INPUT_TRIGGER_WRAPPER_VARIANTS = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SEARCH: 'search',
} as const;

export const INPUT_TRIGGER_WRAPPER_STYLES: Record<
  InputTriggerWrapperVariant,
  string
> = {
  [INPUT_TRIGGER_WRAPPER_VARIANTS.INPUT]: 'py-2 text-body-16-r h-10',
  [INPUT_TRIGGER_WRAPPER_VARIANTS.TEXTAREA]:
    'py-3 text-body-16-r h-[10.625rem] relative',
  [INPUT_TRIGGER_WRAPPER_VARIANTS.SEARCH]: 'h-8 text-body-14-r',
};
