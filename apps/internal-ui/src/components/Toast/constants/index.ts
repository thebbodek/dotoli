import { ButtonProps } from '@/components/Button';
import { IconProps } from '@/components/Icon';
import { ToastType } from '@/components/Toast/types';

export const TOAST_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export const TOAST_TYPE_ICON_PROPS: Record<
  ToastType,
  Pick<IconProps, 'iconKey' | 'className'>
> = {
  [TOAST_TYPES.INFO]: { iconKey: 'info', className: 'text-in-primary-04' },
  [TOAST_TYPES.SUCCESS]: {
    iconKey: 'check-circle',
    className: 'text-in-green-04',
  },
  [TOAST_TYPES.WARNING]: {
    iconKey: 'warning-circle',
    className: 'text-in-yellow-04',
  },
  [TOAST_TYPES.ERROR]: { iconKey: 'x-circle', className: 'text-in-red-04' },
};

export const TOAST_TYPE_ACTION_BUTTON_THEME: Record<
  ToastType,
  ButtonProps['theme']
> = {
  [TOAST_TYPES.INFO]: 'primary',
  [TOAST_TYPES.SUCCESS]: 'green',
  [TOAST_TYPES.WARNING]: 'yellow',
  [TOAST_TYPES.ERROR]: 'red',
};
