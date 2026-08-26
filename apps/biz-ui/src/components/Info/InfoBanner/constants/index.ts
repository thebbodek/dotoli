import clsx from 'clsx';

import { IconProps } from '@/components/Icon';
import {
  InfoBannerTheme,
  InfoBannerThemeStyles,
} from '@/components/Info/InfoBanner/types';
import { TOUCH_TARGET_NARROW_STYLE } from '@/components/shared/constants';

export const INFO_BANNER_THEMES = {
  PRIMARY: 'primary',
  YELLOW: 'yellow',
  GREEN: 'green',
  RED: 'red',
  GRAY: 'gray',
} as const;

export const INFO_BANNER_ICON_KEY: IconProps['iconKey'] = 'info';

export const INFO_BANNER_ACTION_ICON_KEY: IconProps['iconKey'] = 'caret-right';

export const INFO_BANNER_BASE_STYLE =
  'flex-h-stack w-full items-center gap-[4px] px-[14px] py-[6px]';

export const INFO_BANNER_INLINE_STYLE = 'rounded-6 inset-ring';

export const INFO_BANNER_ACTION_STYLE = clsx(
  'relative cursor-pointer',
  TOUCH_TARGET_NARROW_STYLE,
);

/**
 * @description: `size-*`가 없으면 글리프 advance(13)가 박스가 되어 문구가 2px 밀립니다.
 * */
export const INFO_BANNER_ICON_STYLE = 'size-[15px] shrink-0 text-[15px]';

export const INFO_BANNER_TEXT_STYLE =
  'flex-v-stack min-w-0 flex-1 break-all whitespace-pre-line text-left';

/**
 * @description: 높이까지 주면 24가 문구 행높이를 밀어 배너가 33이 아니라 36이 됩니다.
 * */
export const INFO_BANNER_ACTION_WRAPPER_STYLE =
  'flex-h-stack-center w-[24px] shrink-0';

export const INFO_BANNER_ACTION_ICON_STYLE = 'text-[16px] text-gray-500';

export const INFO_BANNER_STYLES: Record<
  InfoBannerTheme,
  InfoBannerThemeStyles
> = {
  [INFO_BANNER_THEMES.PRIMARY]: {
    BACKGROUND: 'bg-blue-100',
    RING: 'inset-ring-blue-200',
    STICKY_RING: 'shadow-[inset_0_-1px_0_0_var(--color-blue-200)]',
    ICON: 'text-blue-300',
  },
  [INFO_BANNER_THEMES.YELLOW]: {
    BACKGROUND: 'bg-yellow-50',
    RING: 'inset-ring-yellow-100',
    STICKY_RING: 'shadow-[inset_0_-1px_0_0_var(--color-yellow-100)]',
    ICON: 'text-yellow-300',
  },
  [INFO_BANNER_THEMES.GREEN]: {
    BACKGROUND: 'bg-green-50',
    RING: 'inset-ring-green-100',
    STICKY_RING: 'shadow-[inset_0_-1px_0_0_var(--color-green-100)]',
    ICON: 'text-green-300',
  },
  [INFO_BANNER_THEMES.RED]: {
    BACKGROUND: 'bg-red-50',
    RING: 'inset-ring-red-100',
    STICKY_RING: 'shadow-[inset_0_-1px_0_0_var(--color-red-100)]',
    ICON: 'text-red-300',
  },
  [INFO_BANNER_THEMES.GRAY]: {
    BACKGROUND: 'bg-gray-100',
    RING: 'inset-ring-gray-200',
    STICKY_RING: 'shadow-[inset_0_-1px_0_0_var(--color-gray-200)]',
    ICON: 'text-gray-300',
  },
};
