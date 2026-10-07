import { ToastAction, ToastProps } from '@/components/Toast';
import { TOAST_AUTO_DISMISS_MS } from '@/components/Toaster/constants';
import {
  ResolveToastActionProps,
  ResolveToastDismissProps,
  ResolveToastDurationProps,
} from '@/components/Toaster/types';

export const resolveToastDuration = ({
  duration,
  isInteractive,
}: ResolveToastDurationProps) => {
  if (duration !== undefined) return duration;

  return isInteractive ? null : TOAST_AUTO_DISMISS_MS;
};

export const resolveToastAction = ({
  action,
  onClose,
}: ResolveToastActionProps): ToastAction | undefined => {
  if (!action) return undefined;

  return {
    label: action.label,
    onClick: (event) => {
      try {
        action.onClick(event);
      } finally {
        onClose();
      }
    },
  };
};

export const resolveToastDismiss = ({
  onDismiss,
  onClose,
}: ResolveToastDismissProps): ToastProps['onDismiss'] => {
  if (!onDismiss) return undefined;

  return () => {
    try {
      onDismiss();
    } finally {
      onClose();
    }
  };
};
