import { FEEDBACK_TOAST_TYPES } from '@/components/FeedbackToast';
import { TOAST_STATUSES } from '@/components/Toast';
import { TOAST_KINDS } from '@/components/Toaster/constants';
import {
  dismissAllToasts,
  dismissToast,
  enqueueToast,
} from '@/components/Toaster/store';
import {
  EnqueueFeedbackToastProps,
  FeedbackToastOption,
  LoadingToastProps,
  ShowToastProps,
} from '@/components/Toaster/types';
import { resolveToastDuration } from '@/components/Toaster/utils';

const show = ({
  message,
  highlight,
  iconKey,
  weight,
  theme,
  action,
  useDismiss = false,
  duration,
}: ShowToastProps) =>
  enqueueToast({
    kind: TOAST_KINDS.TOAST,
    status: TOAST_STATUSES.INFO,
    message,
    highlight,
    iconKey,
    weight,
    theme,
    action,
    useDismiss,
    duration: resolveToastDuration({
      duration,
      isInteractive: !!action || useDismiss,
    }),
  });

const loading = ({ message, duration = null }: LoadingToastProps) =>
  enqueueToast({
    kind: TOAST_KINDS.TOAST,
    status: TOAST_STATUSES.LOADING,
    message,
    useDismiss: false,
    duration,
  });

const feedback = ({ type, message, duration }: EnqueueFeedbackToastProps) =>
  enqueueToast({
    kind: TOAST_KINDS.FEEDBACK,
    type,
    message,
    duration: resolveToastDuration({ duration, isInteractive: false }),
  });

export const toast = {
  show,
  loading,
  success: ({ message, duration }: FeedbackToastOption) =>
    feedback({ type: FEEDBACK_TOAST_TYPES.SUCCESS, message, duration }),
  info: ({ message, duration }: FeedbackToastOption) =>
    feedback({ type: FEEDBACK_TOAST_TYPES.INFO, message, duration }),
  warning: ({ message, duration }: FeedbackToastOption) =>
    feedback({ type: FEEDBACK_TOAST_TYPES.WARNING, message, duration }),
  error: ({ message, duration }: FeedbackToastOption) =>
    feedback({ type: FEEDBACK_TOAST_TYPES.ERROR, message, duration }),
  dismiss: dismissToast,
  dismissAll: dismissAllToasts,
};
