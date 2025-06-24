import { INPUT_FEEDBACK_THEMES } from '@/components/shared/components/InputFeedback/constants';
import { TypographyProps } from '@/components/Typography/types';

export type InputFeedbackTheme =
  (typeof INPUT_FEEDBACK_THEMES)[keyof typeof INPUT_FEEDBACK_THEMES];

export interface InputFeedbackProps
  extends Pick<TypographyProps, 'className' | 'id'> {
  feedback: string;
  theme?: InputFeedbackTheme;
}
