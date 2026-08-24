import { DateBottomSheetType } from '@/components/Calendar/DateBottomSheet/types';

export const DATE_BOTTOM_SHEET_TYPES = {
  MONTH: 'month',
  YEAR: 'year',
} as const;

export const DATE_BOTTOM_SHEET_TITLES: Record<DateBottomSheetType, string> = {
  [DATE_BOTTOM_SHEET_TYPES.MONTH]: '날짜 선택',
  [DATE_BOTTOM_SHEET_TYPES.YEAR]: '년도 선택',
};

export const DATE_BOTTOM_SHEET_MONTH_OPTIONS: readonly number[] = Array.from(
  { length: 12 },
  (_, index) => index + 1,
);

export const DATE_BOTTOM_SHEET_CONTENT_STYLE =
  'flex-v-stack w-full items-start px-[20px] py-[24px]';

export const DATE_BOTTOM_SHEET_OPTION_GRID_STYLE =
  'grid w-full grid-cols-4 gap-[10px]';

export const DATE_BOTTOM_SHEET_OPTION_CELL_STYLE = 'flex-h-stack';

export const DATE_BOTTOM_SHEET_OPTION_CHIP_STYLE = 'basis-0 grow';
