import { IconProps } from '@/components/Icon';
import { ICON_CIRCLE_THEMES, IconCircleTheme } from '@/components/IconCircle';
import { ToastProps, ToastStatus } from '@/components/Toast/types';

export const TOAST_STATUSES = {
  INFO: 'info',
  LOADING: 'loading',
} as const;

export const TOAST_LOADING_ICON_KEY: IconProps['iconKey'] = 'circle-notch';

export const TOAST_DISMISS_ICON_KEY: IconProps['iconKey'] = 'x';

export const TOAST_DISMISS_ARIA_LABEL = '닫기';

export const TOAST_DEFAULT_ROLE: ToastProps['role'] = 'status';

export const TOAST_BASE_STYLE =
  'flex-h-stack animate-toast w-full items-center gap-[10px] rounded-16 bg-gray-900 p-[12px] inset-ring inset-ring-gray-800 shadow-8';

export const TOAST_MESSAGE_STYLE = 'min-w-0 flex-1';

export const TOAST_LOADING_ICON_STYLE = 'animate-spin';

export const TOAST_ICON_THEMES: Record<ToastStatus, IconCircleTheme> = {
  [TOAST_STATUSES.INFO]: ICON_CIRCLE_THEMES.BLACK,
  [TOAST_STATUSES.LOADING]: ICON_CIRCLE_THEMES.PRIMARY,
};
