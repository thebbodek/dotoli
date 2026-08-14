import {
  IconCircleSize,
  IconCircleSizeStyles,
  IconCircleTheme,
} from '@/components/IconCircle/types';

export const ICON_CIRCLE_SIZES = {
  MD: 'md',
  SM: 'sm',
} as const;

export const ICON_CIRCLE_THEMES = {
  PRIMARY: 'primary',
  RED: 'red',
  YELLOW: 'yellow',
  GREEN: 'green',
  GRAY: 'gray',
  BLACK: 'black',
} as const;

export const ICON_CIRCLE_BASE_STYLE = 'flex-h-stack-center shrink-0';

export const ICON_CIRCLE_SIZE_STYLES: Record<
  IconCircleSize,
  IconCircleSizeStyles
> = {
  [ICON_CIRCLE_SIZES.MD]: {
    CONTAINER: 'size-[48px] rounded-16',
    ICON: 'text-[28px]',
  },
  [ICON_CIRCLE_SIZES.SM]: {
    CONTAINER: 'size-[30px] rounded-10',
    ICON: 'text-[20px]',
  },
};

export const ICON_CIRCLE_THEME_STYLES: Record<IconCircleTheme, string> = {
  [ICON_CIRCLE_THEMES.PRIMARY]: 'bg-blue-100 text-blue-300',
  [ICON_CIRCLE_THEMES.RED]: 'bg-red-50 text-red-200',
  [ICON_CIRCLE_THEMES.YELLOW]: 'bg-yellow-50 text-yellow-200',
  [ICON_CIRCLE_THEMES.GREEN]: 'bg-green-50 text-green-200',
  [ICON_CIRCLE_THEMES.GRAY]: 'bg-gray-100 text-gray-300',
  [ICON_CIRCLE_THEMES.BLACK]: 'bg-black text-blue-400',
};
