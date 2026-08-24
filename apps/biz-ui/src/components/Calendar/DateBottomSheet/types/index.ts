import { BottomActionBarProps } from '@/components/BottomActionBar';
import { BottomSheetProps } from '@/components/BottomSheet';
import { DATE_BOTTOM_SHEET_TYPES } from '@/components/Calendar/DateBottomSheet/constants';
import { StickyCalendarProps } from '@/components/Calendar/StickyCalendar';

export type DateBottomSheetType =
  (typeof DATE_BOTTOM_SHEET_TYPES)[keyof typeof DATE_BOTTOM_SHEET_TYPES];

export interface DateBottomSheetChangeProps {
  value: number;
}

export interface DateBottomSheetProps
  extends Pick<
      BottomSheetProps,
      'isOpen' | 'isDimmed' | 'target' | 'className' | 'onClose'
    >,
    Partial<Pick<BottomSheetProps, 'title'>>,
    Pick<StickyCalendarProps, 'dateSelectOption'> {
  options: readonly number[];
  value: number;
  onChange: (props: DateBottomSheetChangeProps) => void;
  type?: DateBottomSheetType;
  actionBarOption?: BottomActionBarProps;
}

export interface DateBottomSheetOptionsProps
  extends Pick<
    DateBottomSheetProps,
    'options' | 'value' | 'type' | 'onChange'
  > {
  name: string;
}

export interface FormatDateBottomSheetOptionProps
  extends Pick<DateBottomSheetProps, 'type'> {
  option: number;
}
