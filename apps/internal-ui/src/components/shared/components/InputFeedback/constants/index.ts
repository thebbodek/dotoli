import { InputFeedbackTheme } from '@/components/shared/components/InputFeedback/types';

export const INPUT_FEEDBACK_THEMES = {
  INFO: 'info',
  ERROR: 'error',
} as const;

export const INPUT_FEEDBACK_THEME_STYLES: Record<InputFeedbackTheme, string> = {
  [INPUT_FEEDBACK_THEMES.INFO]: 'text-primary-05',
  [INPUT_FEEDBACK_THEMES.ERROR]: 'text-red-04',
};

export const INPUT_FEEDBACK_STATES = {
  DEFAULT: 'DEFAULT',
  ERROR: 'ERROR',
  DISABLED: 'DISABLED',
} as const;

export const INPUT_FEEDBACK_STYLES = {
  [INPUT_FEEDBACK_STATES.DEFAULT]: 'border-gray-02 bg-white text-black',
  [INPUT_FEEDBACK_STATES.ERROR]: 'border-red-04 bg-white',
  [INPUT_FEEDBACK_STATES.DISABLED]:
    'bg-gray-02 text-gray-05 cursor-not-allowed border-gray-02',
} as const;
