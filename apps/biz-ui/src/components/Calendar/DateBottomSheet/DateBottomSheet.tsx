import { useId } from 'react';

import { BottomSheet } from '@/components/BottomSheet';
import {
  DATE_BOTTOM_SHEET_CONTENT_STYLE,
  DATE_BOTTOM_SHEET_TITLES,
  DATE_BOTTOM_SHEET_TYPES,
} from '@/components/Calendar/DateBottomSheet/constants';
import DateBottomSheetOptions from '@/components/Calendar/DateBottomSheet/DateBottomSheetOptions';
import { DateBottomSheetProps } from '@/components/Calendar/DateBottomSheet/types';
import { StickyCalendar } from '@/components/Calendar/StickyCalendar';

const DateBottomSheet = ({
  isOpen,
  options,
  value,
  type = DATE_BOTTOM_SHEET_TYPES.MONTH,
  title = DATE_BOTTOM_SHEET_TITLES[type],
  dateSelectOption,
  actionBarOption,
  isDimmed,
  target,
  className,
  onChange,
  onClose,
}: DateBottomSheetProps) => {
  const name = useId();

  return (
    <BottomSheet
      actionBarOption={actionBarOption}
      className={className}
      isDimmed={isDimmed}
      isOpen={isOpen}
      target={target}
      title={title}
      onClose={onClose}
    >
      {!!dateSelectOption && (
        <StickyCalendar
          dateSelectOption={dateSelectOption}
          useWeekday={false}
        />
      )}
      <div className={DATE_BOTTOM_SHEET_CONTENT_STYLE}>
        <DateBottomSheetOptions
          name={name}
          options={options}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </BottomSheet>
  );
};

export default DateBottomSheet;
