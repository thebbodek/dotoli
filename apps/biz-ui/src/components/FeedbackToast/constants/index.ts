import {
  FeedbackToastProps,
  FeedbackToastType,
  FeedbackToastTypeStyles,
} from '@/components/FeedbackToast/types';
import { ICON_WEIGHTS } from '@/components/Icon';

export const FEEDBACK_TOAST_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const FEEDBACK_TOAST_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const FEEDBACK_TOAST_DEFAULT_ROLE: FeedbackToastProps['role'] = 'status';

export const FEEDBACK_TOAST_BASE_STYLE =
  'flex-h-stack animate-toast w-fit max-w-full items-center gap-[6px] rounded-full bg-gray-900 px-[14px] py-[8px] inset-ring inset-ring-gray-800 shadow-8';

export const FEEDBACK_TOAST_ICON_STYLE = 'shrink-0 text-[18px]';

export const FEEDBACK_TOAST_MESSAGE_STYLE = 'min-w-0';

export const FEEDBACK_TOAST_STYLES: Record<
  FeedbackToastType,
  FeedbackToastTypeStyles
> = {
  [FEEDBACK_TOAST_TYPES.SUCCESS]: {
    ICON_KEY: 'check-circle',
    ICON: 'text-green-300',
  },
  [FEEDBACK_TOAST_TYPES.INFO]: {
    ICON_KEY: 'info',
    ICON: 'text-blue-300',
  },
  [FEEDBACK_TOAST_TYPES.WARNING]: {
    ICON_KEY: 'warning-circle',
    ICON: 'text-yellow-300',
  },
  [FEEDBACK_TOAST_TYPES.ERROR]: {
    ICON_KEY: 'x-circle',
    ICON: 'text-red-300',
  },
};
