import { ToastProps } from '@/components/Toast';

export const TOAST_KINDS = {
  TOAST: 'toast',
  FEEDBACK: 'feedback',
} as const;

export const TOAST_AUTO_DISMISS_MS = 5000;

export const TOAST_EXIT_MS = 200;

export const TOAST_ID_PREFIX = 'toast';

export const TOASTER_ROLE: ToastProps['role'] = 'status';

export const TOASTER_ITEM_ROLE: ToastProps['role'] = 'none';

export const TOASTER_BASE_STYLE =
  'flex-h-stack safe-area-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[1100] px-[20px]';

export const TOASTER_ITEM_STYLE =
  'flex-h-stack pointer-events-auto w-full min-w-0 justify-center mb-[calc(20px+var(--toast-offset,0px))]';

export const TOASTER_ITEM_CLOSING_STYLE = 'animate-toast-out';
