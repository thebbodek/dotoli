import { BottomSheet } from '@/components/BottomSheet';
import { Calendar } from '@/components/Calendar/Calendar';
import {
  CALENDAR_BOTTOM_SHEET_BODY_STYLE,
  CALENDAR_BOTTOM_SHEET_DEFAULT_TITLE,
} from '@/components/Calendar/CalendarBottomSheet/constants';
import { CalendarBottomSheetProps } from '@/components/Calendar/CalendarBottomSheet/types';
import { StickyCalendar } from '@/components/Calendar/StickyCalendar';

const CalendarBottomSheet = ({
  isOpen,
  title = CALENDAR_BOTTOM_SHEET_DEFAULT_TITLE,
  calendarOption,
  dateSelectOption,
  actionBarOption,
  useWeekday = true,
  isDimmed,
  target,
  className,
  onClose,
}: CalendarBottomSheetProps) => {
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
      <StickyCalendar
        dateSelectOption={dateSelectOption}
        useWeekday={useWeekday}
      />
      <div className={CALENDAR_BOTTOM_SHEET_BODY_STYLE}>
        <Calendar {...calendarOption} />
      </div>
    </BottomSheet>
  );
};

export default CalendarBottomSheet;
