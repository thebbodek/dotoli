import { BottomActionBarProps } from '@/components/BottomActionBar';
import { BottomSheetProps } from '@/components/BottomSheet';
import { CalendarProps } from '@/components/Calendar/Calendar';
import { StickyCalendarProps } from '@/components/Calendar/StickyCalendar';

export interface CalendarBottomSheetProps
  extends Pick<
      BottomSheetProps,
      'isOpen' | 'isDimmed' | 'target' | 'className' | 'onClose'
    >,
    Partial<Pick<BottomSheetProps, 'title'>>,
    Pick<StickyCalendarProps, 'dateSelectOption' | 'useWeekday'> {
  calendarOption: CalendarProps;
  actionOption?: BottomActionBarProps;
}
