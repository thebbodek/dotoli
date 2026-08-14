import { DividerCaretType, DividerType } from '@/components/Divider/types';
import { IconProps } from '@/components/Icon';
import { COLOR_VARIANTS } from '@/variants';

export const DIVIDER_TYPES = {
  UP: 'up',
  DOWN: 'down',
  TEXT: 'text',
  LINE: 'line',
} as const;

export const DIVIDER_CONTAINER_STYLE =
  'flex-h-stack-center h-[20px] w-full shrink-0 gap-[6px]';

export const DIVIDER_SEGMENT_LINE_STYLE = 'h-px flex-1';

export const DIVIDER_FULL_LINE_STYLE = 'h-px w-full shrink-0';

export const DIVIDER_LABEL_STYLE = 'min-w-0 truncate';

export const DIVIDER_LINE_COLORS: Record<DividerType, string> = {
  [DIVIDER_TYPES.UP]: 'bg-gray-300',
  [DIVIDER_TYPES.DOWN]: 'bg-gray-300',
  [DIVIDER_TYPES.TEXT]: 'bg-gray-300',
  [DIVIDER_TYPES.LINE]: 'bg-gray-100',
};

export const DIVIDER_ICON_KEYS: Record<DividerCaretType, IconProps['iconKey']> =
  {
    [DIVIDER_TYPES.UP]: 'caret-double-up',
    [DIVIDER_TYPES.DOWN]: 'caret-double-down',
  };

export const DIVIDER_ICON_STYLE = 'size-[16px] text-[16px] text-gray-300';

export const DIVIDER_LABEL_COLOR = COLOR_VARIANTS.GRAY_300;
