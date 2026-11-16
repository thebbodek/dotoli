import { ICON_WEIGHTS } from '@/components/Icon/constants';
import {
  OrderWeekStatusDashedStatus,
  OrderWeekStatusDayStatus,
  OrderWeekStatusMarkSpec,
  OrderWeekStatusSize,
} from '@/components/Order/OrderWeekStatus/types';
import { COLOR_VARIANTS, ColorVariants } from '@/variants';

export const ORDER_WEEK_STATUS_DAY_STATUSES = {
  ORDERED: 'ordered',
  UNORDERED: 'unordered',
  DEADLINE_PASSED: 'deadlinePassed',
  SUSPENDED: 'suspended',
  NO_ORDER: 'noOrder',
} as const;

export const ORDER_WEEK_STATUS_SIZES = {
  LG: 'lg',
  SM: 'sm',
} as const;

export const ORDER_WEEK_STATUS_BASE_STYLE = 'grid grid-cols-7 gap-[4px]';

export const ORDER_WEEK_STATUS_DAY_STYLE = 'flex-h-stack justify-center';

export const ORDER_WEEK_STATUS_DAY_VISUAL_STYLE =
  'flex-v-stack items-center gap-[3px]';

export const ORDER_WEEK_STATUS_SR_LABEL_STYLE = 'sr-only';

export const ORDER_WEEK_STATUS_DATE_COLOR = COLOR_VARIANTS.WHITE;

export const ORDER_WEEK_STATUS_DATE_STYLE = 'opacity-70';

export const ORDER_WEEK_STATUS_WEEKDAY_COLORS: Record<
  OrderWeekStatusDayStatus,
  ColorVariants
> = {
  [ORDER_WEEK_STATUS_DAY_STATUSES.ORDERED]: COLOR_VARIANTS.BLUE_200,
  [ORDER_WEEK_STATUS_DAY_STATUSES.UNORDERED]: COLOR_VARIANTS.YELLOW_200,
  [ORDER_WEEK_STATUS_DAY_STATUSES.DEADLINE_PASSED]: COLOR_VARIANTS.BLUE_200,
  [ORDER_WEEK_STATUS_DAY_STATUSES.SUSPENDED]: COLOR_VARIANTS.BLUE_200,
  [ORDER_WEEK_STATUS_DAY_STATUSES.NO_ORDER]: COLOR_VARIANTS.BLUE_200,
};

export const ORDER_WEEK_STATUS_DAY_STATUS_LABELS: Record<
  OrderWeekStatusDayStatus,
  string
> = {
  [ORDER_WEEK_STATUS_DAY_STATUSES.ORDERED]: '입력함',
  [ORDER_WEEK_STATUS_DAY_STATUSES.UNORDERED]: '비어 있음',
  [ORDER_WEEK_STATUS_DAY_STATUSES.DEADLINE_PASSED]: '주문마감',
  [ORDER_WEEK_STATUS_DAY_STATUSES.SUSPENDED]: '중지됨',
  [ORDER_WEEK_STATUS_DAY_STATUSES.NO_ORDER]: '주문 없음',
};

export const ORDER_WEEK_STATUS_DATE_SUFFIX = '일';

export const ORDER_WEEK_STATUS_WEEKDAY_SUFFIX = '요일';

export const ORDER_WEEK_STATUS_MARK_SPECS: Record<
  OrderWeekStatusSize,
  OrderWeekStatusMarkSpec
> = {
  [ORDER_WEEK_STATUS_SIZES.LG]: { BOX: 'size-[30px]', DIAMETER: 30 },
  [ORDER_WEEK_STATUS_SIZES.SM]: { BOX: 'size-[26px]', DIAMETER: 26 },
};

export const ORDER_WEEK_STATUS_MARK_BASE_STYLE =
  'flex-h-stack-center shrink-0 rounded-full';

export const ORDER_WEEK_STATUS_SVG_MARK_STYLE = 'shrink-0';

export const ORDER_WEEK_STATUS_ORDERED_MARK_STYLE = 'bg-white';

export const ORDER_WEEK_STATUS_CHECK_ICON_KEY = 'check';

export const ORDER_WEEK_STATUS_CHECK_ICON_WEIGHT = ICON_WEIGHTS.BOLD;

export const ORDER_WEEK_STATUS_CHECK_ICON_STYLE = 'text-[14px] text-blue-700';

export const ORDER_WEEK_STATUS_NO_ORDER_MARK = '–';

export const ORDER_WEEK_STATUS_NO_ORDER_MARK_COLOR = COLOR_VARIANTS.WHITE;

export const ORDER_WEEK_STATUS_NO_ORDER_MARK_STYLE = 'opacity-60';

export const ORDER_WEEK_STATUS_DASHED_STROKE_STYLES: Record<
  OrderWeekStatusDashedStatus,
  string
> = {
  [ORDER_WEEK_STATUS_DAY_STATUSES.UNORDERED]: 'stroke-yellow-200',
  [ORDER_WEEK_STATUS_DAY_STATUSES.DEADLINE_PASSED]: 'stroke-white/35',
};

export const ORDER_WEEK_STATUS_SUSPENDED_FILL_STYLE = 'fill-white/18';

export const ORDER_WEEK_STATUS_SUSPENDED_SLASH_STYLE = 'stroke-white/70';

export const ORDER_WEEK_STATUS_STROKE_WIDTH = 2;

export const ORDER_WEEK_STATUS_DASH_COUNT = 12;

export const ORDER_WEEK_STATUS_SLASH_RATIOS = {
  START: 1 / 3,
  END: 2 / 3,
} as const;
