import { HTMLAttributes } from 'react';

import { FeedbackToastProps } from '@/components/FeedbackToast';
import { PortalProps } from '@/components/Portal';
import { ToastProps } from '@/components/Toast';
import { TOAST_KINDS } from '@/components/Toaster/constants';

export type ToastKind = (typeof TOAST_KINDS)[keyof typeof TOAST_KINDS];

export interface ToastDurationOption {
  duration?: number | null;
}

export interface ShowToastProps
  extends ToastDurationOption,
    Pick<
      ToastProps,
      'message' | 'highlight' | 'iconKey' | 'weight' | 'theme' | 'action'
    > {
  useDismiss?: boolean;
}

export interface LoadingToastProps
  extends ToastDurationOption,
    Pick<ToastProps, 'message'> {}

export interface FeedbackToastOption
  extends ToastDurationOption,
    Pick<FeedbackToastProps, 'message'> {}

export interface EnqueueFeedbackToastProps
  extends FeedbackToastOption,
    Required<Pick<FeedbackToastProps, 'type'>> {}

export interface ToastItemBase extends Required<ToastDurationOption> {
  id: string;
  isClosing: boolean;
}

export interface ToastItemToast
  extends ToastItemBase,
    Required<Pick<ToastProps, 'message' | 'status'>>,
    Pick<ToastProps, 'highlight' | 'iconKey' | 'weight' | 'theme' | 'action'> {
  kind: typeof TOAST_KINDS.TOAST;
  useDismiss: boolean;
}

export interface ToastItemFeedback
  extends ToastItemBase,
    Required<Pick<FeedbackToastProps, 'message' | 'type'>> {
  kind: typeof TOAST_KINDS.FEEDBACK;
}

export type ToastItem = ToastItemToast | ToastItemFeedback;

export type EnqueueToastProps =
  | Omit<ToastItemToast, 'id' | 'isClosing'>
  | Omit<ToastItemFeedback, 'id' | 'isClosing'>;

export interface DismissToastProps {
  id?: string;
}

export interface ResolveToastDurationProps extends ToastDurationOption {
  isInteractive: boolean;
}

export interface ResolveToastActionProps extends Pick<ToastProps, 'action'> {
  onDismiss: () => void;
}

export interface ToasterProps
  extends Pick<PortalProps, 'target'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}
