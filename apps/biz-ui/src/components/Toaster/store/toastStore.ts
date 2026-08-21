import { TOAST_EXIT_MS, TOAST_ID_PREFIX } from '@/components/Toaster/constants';
import {
  DismissToastProps,
  EnqueueToastProps,
  ToastItem,
} from '@/components/Toaster/types';

let currentToast: ToastItem | null = null;
let toastQueue: ToastItem[] = [];
let listeners: (() => void)[] = [];
let autoDismissTimer: ReturnType<typeof setTimeout> | null = null;
let toastCount = 0;

const notify = () => listeners.forEach((listener) => listener());

const clearAutoDismissTimer = () => {
  if (!autoDismissTimer) return;

  clearTimeout(autoDismissTimer);
  autoDismissTimer = null;
};

const startAutoDismissTimer = () => {
  clearAutoDismissTimer();

  if (!currentToast) return;

  const { id, duration } = currentToast;

  if (duration === null) return;

  autoDismissTimer = setTimeout(() => dismissToast({ id }), duration);
};

const flushToast = () => {
  if (currentToast) return;

  const [next, ...rest] = toastQueue;

  if (!next) return;

  toastQueue = rest;
  currentToast = next;
  startAutoDismissTimer();
};

export const subscribeToast = (listener: () => void) => {
  listeners = [...listeners, listener];

  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
};

export const getToastSnapshot = () => currentToast;

export const getToastServerSnapshot = (): ToastItem | null => null;

export const enqueueToast = (props: EnqueueToastProps) => {
  toastCount += 1;

  const id = `${TOAST_ID_PREFIX}-${toastCount}`;
  const toast = { ...props, id, isClosing: false };
  const isReplaceable =
    !!currentToast && !currentToast.isClosing && currentToast.duration !== null;

  if (isReplaceable) {
    clearAutoDismissTimer();
    currentToast = null;
  }

  toastQueue = isReplaceable ? [toast, ...toastQueue] : [...toastQueue, toast];

  flushToast();
  notify();

  return id;
};

export const dismissToast = ({ id }: DismissToastProps = {}) => {
  const isQueued = !!id && toastQueue.some((toast) => toast.id === id);

  if (isQueued) {
    toastQueue = toastQueue.filter((toast) => toast.id !== id);

    return;
  }

  if (!currentToast || currentToast.isClosing) return;

  if (id && currentToast.id !== id) return;

  clearAutoDismissTimer();

  currentToast = { ...currentToast, isClosing: true };
  notify();

  setTimeout(() => {
    currentToast = null;
    flushToast();
    notify();
  }, TOAST_EXIT_MS);
};

export const dismissAllToasts = () => {
  toastQueue = [];
  dismissToast();
};
