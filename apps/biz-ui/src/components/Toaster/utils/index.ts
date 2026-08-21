import { ToastAction } from '@/components/Toast';
import { TOAST_AUTO_DISMISS_MS } from '@/components/Toaster/constants';
import {
  ResolveToastActionProps,
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
  onDismiss,
}: ResolveToastActionProps): ToastAction | undefined => {
  if (!action) return undefined;

  return {
    label: action.label,
    onClick: (event) => {
      action.onClick(event);
      onDismiss();
    },
  };
};
