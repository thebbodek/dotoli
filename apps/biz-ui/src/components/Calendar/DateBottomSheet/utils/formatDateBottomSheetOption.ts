import { DATE_BOTTOM_SHEET_TYPES } from '@/components/Calendar/DateBottomSheet/constants';
import { FormatDateBottomSheetOptionProps } from '@/components/Calendar/DateBottomSheet/types';
import {
  CALENDAR_MONTH_SUFFIX,
  formatCalendarYear,
} from '@/components/Calendar/shared';

export const formatDateBottomSheetOption = ({
  type,
  option,
}: FormatDateBottomSheetOptionProps) => {
  if (type === DATE_BOTTOM_SHEET_TYPES.YEAR) {
    return formatCalendarYear({ year: option });
  }

  return `${option}${CALENDAR_MONTH_SUFFIX}`;
};
