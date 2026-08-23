import { StickyCalendarWeekday } from '@/components/Calendar/StickyCalendar/types';
import { IconProps } from '@/components/Icon';
import { COLOR_VARIANTS } from '@/variants';

export const STICKY_CALENDAR_PREV_YEAR_LABEL = '작년';

export const STICKY_CALENDAR_NEXT_YEAR_LABEL = '내년';

export const STICKY_CALENDAR_PREV_YEAR_ICON_KEY: IconProps['iconKey'] =
  'caret-left';

export const STICKY_CALENDAR_NEXT_YEAR_ICON_KEY: IconProps['iconKey'] =
  'caret-right';

export const STICKY_CALENDAR_YEAR_ICON_KEY: IconProps['iconKey'] = 'caret-down';

export const STICKY_CALENDAR_WEEKDAYS: readonly StickyCalendarWeekday[] = [
  { label: '일', color: COLOR_VARIANTS.RED_400 },
  { label: '월', color: COLOR_VARIANTS.GRAY_600 },
  { label: '화', color: COLOR_VARIANTS.GRAY_600 },
  { label: '수', color: COLOR_VARIANTS.GRAY_600 },
  { label: '목', color: COLOR_VARIANTS.GRAY_600 },
  { label: '금', color: COLOR_VARIANTS.GRAY_600 },
  { label: '토', color: COLOR_VARIANTS.RED_400 },
];

export const STICKY_CALENDAR_BASE_STYLE =
  'flex-v-stack sticky top-0 z-10 w-full shrink-0 items-center gap-[8px] overflow-hidden bg-white px-[20px] pt-[6px] pb-[10px]';

export const STICKY_CALENDAR_DATE_SELECT_STYLE =
  'flex-h-stack w-full items-center justify-between px-[10px] py-[6px]';

export const STICKY_CALENDAR_WEEKDAY_ROW_STYLE = 'flex-h-stack items-start';

export const STICKY_CALENDAR_WEEKDAY_STYLE =
  'flex-v-stack-center w-[48px] shrink-0';
