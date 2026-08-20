import clsx from 'clsx';

import { ICON_WEIGHTS, IconProps } from '@/components/Icon';
import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';
import {
  StatusAlertBannerTheme,
  StatusAlertBannerThemeStyles,
} from '@/components/StatusAlertBanner/types';

export const STATUS_ALERT_BANNER_THEMES = {
  PRIMARY: 'primary',
  YELLOW: 'yellow',
  RED: 'red',
  GREEN: 'green',
} as const;

export const STATUS_ALERT_BANNER_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const STATUS_ALERT_BANNER_DISMISS_ICON_KEY: IconProps['iconKey'] = 'x';

export const STATUS_ALERT_BANNER_DISMISS_ICON_WEIGHT = ICON_WEIGHTS.BOLD;

export const STATUS_ALERT_BANNER_ACTION_LABEL = '보기';

export const STATUS_ALERT_BANNER_DISMISS_ARIA_LABEL = '닫기';

export const STATUS_ALERT_BANNER_BASE_STYLE =
  'flex-h-stack relative w-fit max-w-full items-center gap-[12px] rounded-6 bg-black px-[13px] py-[8px]';

export const STATUS_ALERT_BANNER_TAIL_STYLE =
  'absolute -top-[6px] left-[14px] h-[10px] w-[16px] bg-inherit [clip-path:polygon(50%_0%,100%_100%,0%_100%)]';

export const STATUS_ALERT_BANNER_CONTENT_STYLE =
  'flex-h-stack min-w-0 items-center gap-[4px]';

export const STATUS_ALERT_BANNER_ICON_STYLE =
  'size-[16px] shrink-0 text-[16px]';

export const STATUS_ALERT_BANNER_MESSAGE_STYLE = 'min-w-0 truncate';

export const STATUS_ALERT_BANNER_ACTION_STYLE = clsx(
  'text-label-bold relative shrink-0 cursor-pointer whitespace-nowrap text-blue-600',
  TOUCH_TARGET_STYLE,
);

export const STATUS_ALERT_BANNER_DISMISS_STYLE = clsx(
  'flex-h-stack-center relative shrink-0 cursor-pointer',
  TOUCH_TARGET_STYLE,
);

export const STATUS_ALERT_BANNER_DISMISS_ICON_STYLE =
  'size-[14px] text-[14px] text-white';

export const STATUS_ALERT_BANNER_STYLES: Record<
  StatusAlertBannerTheme,
  StatusAlertBannerThemeStyles
> = {
  [STATUS_ALERT_BANNER_THEMES.PRIMARY]: {
    ICON_KEY: 'info',
    ICON: 'text-blue-300',
  },
  [STATUS_ALERT_BANNER_THEMES.YELLOW]: {
    ICON_KEY: 'warning-octagon',
    ICON: 'text-yellow-200',
  },
  [STATUS_ALERT_BANNER_THEMES.RED]: {
    ICON_KEY: 'warning-octagon',
    ICON: 'text-red-200',
  },
  [STATUS_ALERT_BANNER_THEMES.GREEN]: {
    ICON_KEY: 'check-circle',
    ICON: 'text-green-200',
  },
};
