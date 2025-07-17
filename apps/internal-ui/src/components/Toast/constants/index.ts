import { ButtonProps } from '@/components/Button';
import { ToastType } from '@/components/Toast/types';

export const TOAST_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const TOAST_TYPE_ICON_PROPS = {
  [TOAST_TYPES.INFO]: { iconKey: 'info', color: 'text-in-primary-04' },
  [TOAST_TYPES.SUCCESS]: {
    iconKey: 'check-circle',
    color: 'text-in-green-04',
  },
  [TOAST_TYPES.WARNING]: {
    iconKey: 'warning-circle',
    color: 'text-in-yellow-04',
  },
  [TOAST_TYPES.ERROR]: { iconKey: 'x-circle', color: 'text-in-red-04' },
} as const;

export const TOAST_TYPE_ACTION_BUTTON_THEME: Record<
  ToastType,
  ButtonProps['theme']
> = {
  [TOAST_TYPES.INFO]: 'primary',
  [TOAST_TYPES.SUCCESS]: 'green',
  [TOAST_TYPES.WARNING]: 'yellow',
  [TOAST_TYPES.ERROR]: 'red',
};
