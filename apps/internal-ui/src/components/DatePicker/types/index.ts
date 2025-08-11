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
import { ReactNode } from 'react';

export interface DatePickerProps
  extends Pick<SelectBaseProps, 'label'>,
    Pick<SelectBaseLabelProps, 'badge'>,
    Omit<DatePickerWrapperProps, 'label' | 'children' | 'type' | 'labelId'>,
    CalendarProps,
    CalendarContextProviderProps {}

export interface DatePickerWrapperProps
  extends Pick<
    SelectBaseProps,
    | 'disabled'
    | 'feedback'
    | 'required'
    | 'isError'
    | 'placeholder'
    | 'className'
    | 'type'
    | 'controls'
    | 'labelId'
    | 'children'
    | 'popoverOption'
  > {
  label: ReactNode;
}

export interface DatePickerSelectButtonProps
  extends Pick<SelectBaseChildrenProps, 'close'> {}

export interface IsValidDateOfVariantParams
  extends Pick<CalendarContextProviderProps, 'variant'> {
  value: CalendarContextValue['internalValue'] | CalendarValue;
}
