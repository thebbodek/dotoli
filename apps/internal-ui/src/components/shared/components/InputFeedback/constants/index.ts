import { InputFeedbackTheme } from '@/components/shared/components/InputFeedback/types';
import { TypographyProps } from '@/components/Typography';

export const INPUT_FEEDBACK_THEMES = {
  INFO: 'info',
  ERROR: 'error',
} as const;

export const INPUT_FEEDBACK_TYPOGRAPHY_COLOR: Record<
  InputFeedbackTheme,
  TypographyProps['color']
> = {
  [INPUT_FEEDBACK_THEMES.INFO]: 'primary-05',
  [INPUT_FEEDBACK_THEMES.ERROR]: 'red-04',
};
