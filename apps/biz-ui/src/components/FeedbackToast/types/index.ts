import { HTMLAttributes } from 'react';

import { FEEDBACK_TOAST_TYPES } from '@/components/FeedbackToast/constants';
import { IconProps } from '@/components/Icon';

export type FeedbackToastType =
  (typeof FEEDBACK_TOAST_TYPES)[keyof typeof FEEDBACK_TOAST_TYPES];

export interface FeedbackToastTypeStyles {
  ICON_KEY: IconProps['iconKey'];
  ICON: string;
}

export interface FeedbackToastProps
  extends Pick<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'role' | 'aria-live'
  > {
  message: string;
  type?: FeedbackToastType;
}
