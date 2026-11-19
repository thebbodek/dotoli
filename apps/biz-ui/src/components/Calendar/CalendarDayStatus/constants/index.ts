import { CalendarDayStatusType } from '@/components/Calendar/CalendarDayStatus/types';
import { ICON_WEIGHTS } from '@/components/Icon/constants';
import { COLOR_VARIANTS, ColorVariants } from '@/variants';

export const CALENDAR_DAY_STATUSES = {
  DONE: 'done',
  URGENT: 'urgent',
  EMPTY: 'empty',
  UNAVAILABLE: 'unavailable',
} as const;

export const CALENDAR_DAY_STATUS_BASE_STYLE =
  'flex-v-stack-center relative h-[48px] rounded-10';

export const CALENDAR_DAY_STATUS_STYLES: Record<CalendarDayStatusType, string> =
  {
    [CALENDAR_DAY_STATUSES.DONE]: 'bg-white',
    [CALENDAR_DAY_STATUSES.URGENT]:
      'bg-white/16 inset-ring-[1.5px] inset-ring-yellow-200',
    [CALENDAR_DAY_STATUSES.EMPTY]: 'border-[1.5px] border-dashed border-white',
    [CALENDAR_DAY_STATUSES.UNAVAILABLE]: '',
  };

export const CALENDAR_DAY_STATUS_COLORS: Record<
  CalendarDayStatusType,
  ColorVariants
> = {
  [CALENDAR_DAY_STATUSES.DONE]: COLOR_VARIANTS.BLUE_700,
  [CALENDAR_DAY_STATUSES.URGENT]: COLOR_VARIANTS.YELLOW_200,
  [CALENDAR_DAY_STATUSES.EMPTY]: COLOR_VARIANTS.BLUE_100,
  [CALENDAR_DAY_STATUSES.UNAVAILABLE]: COLOR_VARIANTS.WHITE,
};

export const CALENDAR_DAY_STATUS_VISUAL_STYLE = 'flex-v-stack items-center';

export const CALENDAR_DAY_STATUS_SR_LABEL_STYLE = 'sr-only';

export const CALENDAR_DAY_STATUS_WEEKDAY_SUFFIX = '요일';

export const CALENDAR_DAY_STATUS_CHECK_BADGE_STYLE =
  'flex-h-stack-center absolute top-[-4px] right-[-3px] size-[12px] rounded-full bg-blue-600 inset-ring inset-ring-white';

export const CALENDAR_DAY_STATUS_CHECK_ICON_KEY = 'check';

export const CALENDAR_DAY_STATUS_CHECK_ICON_WEIGHT = ICON_WEIGHTS.BOLD;

export const CALENDAR_DAY_STATUS_CHECK_ICON_STYLE = 'text-[7px] text-white';
