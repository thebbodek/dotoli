import {
  CalendarContextProviderProps,
  CalendarContextValue,
  CalendarProps,
  CalendarValue,
} from '@/components/Calendar';
import {
  SelectBaseChildrenProps,
  SelectBaseLabelProps,
  SelectBaseProps,
} from '@/components/Select';

export interface DatePickerProps
  extends Pick<
      SelectBaseProps,
      | 'disabled'
      | 'feedback'
      | 'required'
      | 'isError'
      | 'placeholder'
      | 'className'
    >,
    Pick<SelectBaseLabelProps, 'label' | 'hiddenLabel'>,
    Pick<SelectBaseLabelProps, 'badge'>,
    CalendarProps,
    CalendarContextProviderProps {
  popoverOption?: Omit<
    SelectBaseProps['popoverOption'],
    'useClickOutsideEvent'
  >;
}

export interface DatePickerSelectButtonProps
  extends Pick<SelectBaseChildrenProps, 'close'> {}

export interface IsValidDateOfVariantParams
  extends Pick<CalendarContextProviderProps, 'variant'> {
  value: CalendarContextValue['internalValue'] | CalendarValue;
}
